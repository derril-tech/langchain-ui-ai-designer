"""
Simple backend startup script.

This script starts the FastAPI server with the correct Python path.
"""

import subprocess
import sys
import os

def start_server():
    """Start the FastAPI server."""
    # Change to backend directory
    backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
    os.chdir(backend_dir)
    
    # Start the server
    subprocess.run([
        sys.executable, "-m", "uvicorn", 
        "api.server:app", 
        "--host", "0.0.0.0", 
        "--port", "8000",
        "--reload"
    ])

if __name__ == "__main__":
    start_server()
