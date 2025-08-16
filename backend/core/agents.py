# design_agent/agents.py
from __future__ import annotations
import json
from typing import Dict, Any, AsyncIterator

from langchain_openai import ChatOpenAI
from langchain.agents import create_openai_tools_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableLambda, RunnableSequence

from .core import SYSTEM_BASE, SCHEMA, pack_user_prompt, pack_schema_for_model, validate_and_fix_palette
from .tools import docs_search, suggest_palette, ai_patterns, safety_rules
from .exporters import write_project

# ===== LLMs =====
design_llm = ChatOpenAI(model="gpt-4o-2024-08-06", temperature=0.5)
ops_llm    = ChatOpenAI(model="gpt-4o-2024-08-06", temperature=0.2)
engine_llm = ChatOpenAI(model="gpt-4o-2024-08-06", temperature=0.3)

# ===== Prompts =====
design_prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_BASE),
    ("user", "{schema_json}"),
    ("user", "{user_brief}"),
    MessagesPlaceholder("agent_scratchpad"),
])

ops_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are Agent Ops. Verify safety, latency, and observability. "
               "Return a short JSON patch with keys you want to add/update under aiSolution and components."),
    ("user", "Here is the current spec JSON:\n{spec_json}\n"
             "Suggest minimal changes to include: safety banners, run timeline visibility, and latency hints.")
])

engine_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a UI Engineer. Given the approved spec JSON, confirm tokens and file list are buildable. "
               "Return 'OK' and any minor fixes as a JSON with keys 'notes' and optional 'patch'."),
    ("user", "Spec JSON:\n{spec_json}")
])

# ===== Tools bound to Strategist agent =====
strategist_agent = create_openai_tools_agent(
    llm=design_llm,
    tools=[docs_search, suggest_palette, ai_patterns, safety_rules],
    prompt=design_prompt,
)
strategist_exec = AgentExecutor(agent=strategist_agent, tools=[docs_search, suggest_palette, ai_patterns, safety_rules], verbose=False)

# ====== Orchestration (non-streaming pipeline) ======
def run_pipeline(payload: Dict[str, Any]) -> Dict[str, Any]:
    """Sequential multi-agent orchestration: Strategist -> Ops -> Engineer -> Export."""
    # 1) Strategist generates spec (may call tools)
    user_brief = pack_user_prompt(**payload)
    schema_json = pack_schema_for_model()
    strategist_out = strategist_exec.invoke({"schema_json": schema_json, "user_brief": user_brief})
    raw = strategist_out["output"]
    spec = json.loads(raw) if isinstance(raw, str) else raw

    # 2) Validate palette contrast + minimal fixes
    spec = validate_and_fix_palette(spec)

    # 3) Agent Ops: add safety/latency/observability adjustments
    ops_txt = ops_prompt.format(spec_json=json.dumps(spec)).to_messages()
    ops_resp = ops_llm.invoke(ops_txt)
    try:
        patch = json.loads(ops_resp.content)
        # apply shallow patch to aiSolution and maybe components
        ai_sol = spec.get("aiSolution", {})
        ai_sol.update(patch.get("aiSolution", {}))
        spec["aiSolution"] = ai_sol
        if "components" in patch:
            spec["components"].extend(patch["components"])
    except Exception:
        pass  # ignore if ops didn't return JSON

    # 4) UI Engineer sanity + export
    eng_msgs = engine_prompt.format(spec_json=json.dumps(spec)).to_messages()
    _ = engine_llm.invoke(eng_msgs)  # we won't parse, just trust or log notes

    out_dir = write_project(spec, out_dir=payload.get("out_dir", "ui-agent-output"))
    return {"spec": spec, "out_dir": out_dir}

# ====== Streaming Orchestration for UI (yields events) ======
async def astream_pipeline(payload: Dict[str, Any]) -> AsyncIterator[Dict[str, Any]]:
    """Yield small JSON events suitable for SSE."""
    yield {"type": "status", "text": "starting"}

    # Strategist (stream tokens)
    user_brief = pack_user_prompt(**payload)
    schema_json = pack_schema_for_model()
    messages = design_prompt.format_messages(schema_json=schema_json, user_brief=user_brief, agent_scratchpad=[])
    yield {"type":"phase", "text":"design_strategist"}

    # token stream from LLM (as text; at end we parse JSON)
    json_text = ""
    async for event in design_llm.astream_events(messages, version="v1"):
        if event["event"] == "on_chat_model_stream":
            chunk = event["data"]["chunk"].content or ""
            json_text += chunk
            yield {"type": "token", "text": chunk}
    yield {"type": "status", "text": "parsing"}
    try:
        spec = json.loads(json_text)
    except Exception:
        # Fallback: ask the model to reformat as strict JSON
        fix = await design_llm.ainvoke([
            ("system","Return ONLY valid JSON that strictly matches the schema below."),
            ("user", schema_json),
            ("user", f"Fix this into valid JSON:\n{json_text}")
        ])
        spec = json.loads(fix.content)

    # Validate contrast
    spec = validate_and_fix_palette(spec)
    yield {"type":"phase", "text":"agent_ops"}

    # Ops pass
    ops_msgs = ops_prompt.format(spec_json=json.dumps(spec)).to_messages()
    ops_resp = await ops_llm.ainvoke(ops_msgs)
    try:
        patch = json.loads(ops_resp.content)
        ai_sol = spec.get("aiSolution", {})
        ai_sol.update(patch.get("aiSolution", {}))
        spec["aiSolution"] = ai_sol
        if "components" in patch:
            spec["components"].extend(patch["components"])
        yield {"type":"ops_patch", "text":"applied"}
    except Exception:
        yield {"type":"ops_patch", "text":"none"}

    # Engineer & export
    yield {"type":"phase", "text":"ui_engineer"}
    out_dir = write_project(spec, out_dir=payload.get("out_dir","ui-agent-output"))
    yield {"type":"export", "text": out_dir}

    yield {"type":"final", "spec": spec}
