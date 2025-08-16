# design_agent/tools.py
from __future__ import annotations
from typing import List, Dict
from pydantic import BaseModel, Field
from langchain.tools import tool

# --- Enhanced demo corpus with AI-specific patterns ---
DOCS = {
    "tailwind": "Tailwind CSS utility-first styling. Use theme tokens and @apply sparingly. CSS variables for dynamic theming.",
    "next": "Next.js App Router supports React Server Components, streaming, and route handlers. Use Suspense for loading states.",
    "a11y": "WCAG AA contrast 4.5:1 for normal text. Provide focus rings and semantic landmarks. Support reduced motion.",
    "genai": "GenAI UX: show streaming tokens, tool-call steps, and citations for trust. Use optimistic UI for perceived speed.",
    "agents": "Multi-agent orchestration benefits from a Run Timeline and explicit handoffs. Show agent switching clearly.",
    "safety": "Content filtering, redaction patterns, and hallucination cues improve trust. Use clear warning banners.",
    "streaming": "Token-by-token streaming reduces perceived latency. Use skeleton loaders and progressive disclosure.",
    "citations": "Always show source attribution for RAG results. Use expandable citation panels with confidence scores.",
    "observability": "Event logging for debugging. Show token counts, tool usage, and performance metrics in dev mode.",
    "conversational": "Chat-first interfaces need clear message threading, typing indicators, and conversation history.",
    "copilot": "Sidebar or inline assistance. Show context awareness and allow easy dismissal/acceptance of suggestions.",
    "workflow": "Step-by-step guidance with progress indicators. Allow users to skip, retry, or modify agent actions.",
    "orchestrator": "Dashboard view of multiple agents. Show agent status, handoffs, and allow manual intervention."
}

class DocsSearchInput(BaseModel):
    query: str = Field(..., description="Short query about Next.js, Tailwind, a11y, GenAI, or agents")
    k: int = Field(3, description="How many snippets to return")

@tool("docs_search", args_schema=DocsSearchInput, return_direct=False)
def docs_search(query: str, k: int = 3) -> List[Dict[str, str]]:
    """Search a small built-in corpus for guidance (demo).
    Replace with your RAG/VectorStore later."""
    q = query.lower()
    scored = []
    for key, text in DOCS.items():
        score = sum(1 for tok in q.split() if tok in text.lower())
        if score:
            scored.append((score, key, text))
    scored.sort(reverse=True, key=lambda x: x[0])
    out = [{"source": key, "snippet": text} for _, key, text in scored[:k]]
    if not out:
        out = [{"source": "generic", "snippet": "No direct hits. Consider broader search or KB indexing."}]
    return out

# ----- Color utilities as a tool -----
class PaletteSuggestInput(BaseModel):
    subject: str = Field(..., description="Domain subject like finance, wellness, developer tools")
    mood: str = Field("calm, trustworthy", description="A few adjectives guiding the palette")

@tool("suggest_palette", args_schema=PaletteSuggestInput, return_direct=False)
def suggest_palette(subject: str, mood: str = "calm, trustworthy") -> Dict[str, str]:
    """Return a minimal hex palette suggestion based on subject & mood (demo heuristic)."""
    subject = subject.lower()
    if "finance" in subject:
        primary = "#0F62FE"; accent = "#2ECC71"; bg = "#0B0C10"; surface = "#16181D"
    elif "wellness" in subject or "fitness" in subject:
        primary = "#22C55E"; accent = "#0EA5E9"; bg = "#0A0A0A"; surface = "#121212"
    elif "dev" in subject or "developer" in subject:
        primary = "#7C3AED"; accent = "#06B6D4"; bg = "#0B1020"; surface = "#121933"
    else:
        primary = "#3B82F6"; accent = "#F59E0B"; bg = "#0B0B0B"; surface = "#151515"

    return {
        "primary": primary,
        "accent": accent,
        "bg": bg,
        "surface": surface,
        "success": "#16A34A",
        "warning": "#F59E0B",
        "danger": "#EF4444",
        "muted": "#9CA3AF",
        "onBg": "#FFFFFF",
        "onSurface": "#E5E7EB",
        "onPrimary": "#FFFFFF",
        "thinking": "#F59E0B",
        "streaming": "#06B6D4",
        "toolCall": "#7C3AED",
        "citation": "#16A34A",
        "safety": "#EF4444"
    }

# ----- AI Pattern Detection Tool -----
class AIPatternInput(BaseModel):
    purpose: str = Field(..., description="App purpose like booking, dashboard, knowledge base")
    ai_use_cases: str = Field(..., description="AI use cases like chat, RAG, agents")
    latency_budget: int = Field(2000, description="Latency budget in milliseconds")

@tool("ai_patterns", args_schema=AIPatternInput, return_direct=False)
def ai_patterns(purpose: str, ai_use_cases: str, latency_budget: int = 2000) -> Dict[str, Any]:
    """Determine optimal AI UX pattern based on purpose and constraints."""
    use_cases = ai_use_cases.lower()
    purpose_lower = purpose.lower()
    
    # Pattern detection logic
    if "chat" in use_cases or "conversation" in use_cases:
        pattern = "conversational"
        streaming = "essential"
        citations = "mandatory" if "rag" in use_cases else "optional"
    elif "copilot" in use_cases or "assistant" in use_cases:
        pattern = "copilot"
        streaming = "preferred"
        citations = "recommended"
    elif "workflow" in use_cases or "orchestration" in use_cases:
        pattern = "workflow"
        streaming = "progressive"
        citations = "contextual"
    elif "agents" in use_cases or "multi-agent" in use_cases:
        pattern = "orchestrator"
        streaming = "status_updates"
        citations = "per_agent"
    else:
        pattern = "conversational"
        streaming = "optional"
        citations = "optional"
    
    # Latency-based optimizations
    if latency_budget < 1000:
        optimistic_ui = True
        skeleton_strategy = "immediate"
    elif latency_budget < 3000:
        optimistic_ui = True
        skeleton_strategy = "progressive"
    else:
        optimistic_ui = False
        skeleton_strategy = "minimal"
    
    return {
        "pattern": pattern,
        "streaming": streaming,
        "citations": citations,
        "optimistic_ui": optimistic_ui,
        "skeleton_strategy": skeleton_strategy,
        "tool_visibility": "expanded" if pattern in ["workflow", "orchestrator"] else "collapsible"
    }

# ----- Safety & Observability Tool -----
class SafetyInput(BaseModel):
    safety_level: str = Field("moderate", description="Safety level: strict, moderate, or relaxed")
    telemetry_opt_in: str = Field("off", description="Telemetry opt-in: on or off")

@tool("safety_rules", args_schema=SafetyInput, return_direct=False)
def safety_rules(safety_level: str = "moderate", telemetry_opt_in: str = "off") -> Dict[str, Any]:
    """Generate safety and observability rules based on configuration."""
    safety_config = {
        "strict": {
            "content_filtering": True,
            "redaction": True,
            "hallucination_cues": True,
            "guardrails": ["pii_masking", "toxicity_filter", "fact_checking"]
        },
        "moderate": {
            "content_filtering": True,
            "redaction": False,
            "hallucination_cues": True,
            "guardrails": ["pii_masking", "toxicity_filter"]
        },
        "relaxed": {
            "content_filtering": False,
            "redaction": False,
            "hallucination_cues": False,
            "guardrails": ["basic_filtering"]
        }
    }
    
    observability_config = {
        "on": {
            "telemetry": True,
            "run_timeline": True,
            "token_meter": True,
            "event_schema": {
                "started": "timestamp, user_id, session_id",
                "partial": "timestamp, token_count, partial_text",
                "tool": "timestamp, tool_name, parameters, result",
                "final": "timestamp, total_tokens, final_text, citations"
            }
        },
        "off": {
            "telemetry": False,
            "run_timeline": True,
            "token_meter": False,
            "event_schema": {
                "started": "timestamp",
                "partial": "timestamp, partial_text",
                "tool": "timestamp, tool_name",
                "final": "timestamp, final_text"
            }
        }
    }
    
    return {
        "safety": safety_config.get(safety_level, safety_config["moderate"]),
        "observability": observability_config.get(telemetry_opt_in, observability_config["off"])
    }
