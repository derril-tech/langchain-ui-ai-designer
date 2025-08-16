"""
Server startup script for the UI Design Expert Agent.

Run this script from the project root to start the FastAPI server.
"""

import uvicorn
import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from backend.config import settings

if __name__ == "__main__":
    uvicorn.run(
        "backend.api.server:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        log_level="info" if settings.debug else "warning"
    )
