"""
CLI runner for the UI Design Expert Agent.

Provides a command-line interface for design generation.
"""

import os
import json
from dotenv import load_dotenv
from core.agents import run_pipeline

def main():
    """Main CLI function."""
    load_dotenv()
    payload = dict(
        purpose="Research copilot for a knowledge base",
        audience="Analysts and PMs",
        tone="calm, precise, credible",
        subject="knowledge work",
        brand="#0EA5E9 as primary, #22C55E as success",
        constraints="dark+light themes, AA contrast, prefers shadcn",
        ai_use_cases="RAG search, multi-agent tool use with citations",
        latency_budget=1800,
        needs_citations="true",
        out_dir="ui-agent-output"
    )
    result = run_pipeline(payload)
    print("Wrote files to:", result["out_dir"])
    print("Spec keys:", list(result["spec"].keys()))
    # Optional: dump spec for inspection
    open(os.path.join(result["out_dir"], "ui-spec.json"), "w").write(json.dumps(result["spec"], indent=2))


if __name__ == "__main__":
    main()
