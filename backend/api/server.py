"""
FastAPI server for the UI Design Expert Agent.

Provides streaming and synchronous endpoints for design generation.
"""

from __future__ import annotations
import json
from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sse_starlette.sse import EventSourceResponse
from pydantic import BaseModel
import asyncio

from ..core.agents import astream_pipeline
from ..config import settings

app = FastAPI(
    title=settings.api_title,
    description=settings.api_description,
    version=settings.api_version
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DesignRequest(BaseModel):
    purpose: str
    audience: str
    tone: str
    subject: str
    brand: str = ""
    constraints: str = ""
    ai_use_cases: str = ""
    latency_budget: int = 2000
    needs_citations: str = "false"
    safety_level: str = "moderate"
    telemetry_opt_in: str = "off"
    out_dir: str = "ui-agent-output"

@app.get("/")
async def root():
    return {"message": "UI Design Expert Agent API", "version": "1.0.0"}

@app.post("/api/design/stream")
async def stream_design(request: DesignRequest):
    """Stream design generation events via Server-Sent Events."""
    async def event_generator():
        try:
            payload = request.dict()
            async for event in astream_pipeline(payload):
                if event["type"] == "token":
                    yield {
                        "event": "token",
                        "data": json.dumps({"text": event["text"]})
                    }
                elif event["type"] == "phase":
                    yield {
                        "event": "phase",
                        "data": json.dumps({"text": event["text"]})
                    }
                elif event["type"] == "status":
                    yield {
                        "event": "status",
                        "data": json.dumps({"text": event["text"]})
                    }
                elif event["type"] == "ops_patch":
                    yield {
                        "event": "ops_patch",
                        "data": json.dumps({"text": event["text"]})
                    }
                elif event["type"] == "export":
                    yield {
                        "event": "export",
                        "data": json.dumps({"out_dir": event["text"]})
                    }
                elif event["type"] == "final":
                    yield {
                        "event": "final",
                        "data": json.dumps({"spec": event["spec"]})
                    }
                
                # Small delay to prevent overwhelming the client
                await asyncio.sleep(0.01)
                
        except Exception as e:
            yield {
                "event": "error",
                "data": json.dumps({"error": str(e)})
            }
    
    return EventSourceResponse(event_generator())

@app.post("/api/design/sync")
async def sync_design(request: DesignRequest):
    """Synchronous design generation (for CLI/testing)."""
    try:
        from ..core.agents import run_pipeline
        payload = request.dict()
        result = run_pipeline(payload)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
