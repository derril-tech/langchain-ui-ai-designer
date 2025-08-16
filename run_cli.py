"""
CLI runner for the UI Design Expert Agent.

Run this script from the project root to generate designs via command line.
"""

import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

from backend.main import main

if __name__ == "__main__":
    main()
