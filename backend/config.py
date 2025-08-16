"""
Configuration settings for the UI Design Expert Agent backend.
"""

import os
from typing import Optional
from pydantic import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    # API Settings
    api_title: str = "UI Design Expert Agent API"
    api_description: str = "AI-Powered Design System Generator"
    api_version: str = "1.0.0"
    
    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000
    debug: bool = False
    
    # OpenAI Settings
    openai_api_key: Optional[str] = None
    
    # CORS Settings
    cors_origins: list = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ]
    
    # Output Settings
    default_output_dir: str = "ui-agent-output"
    
    class Config:
        env_file = ".env.local"
        case_sensitive = False


# Global settings instance
settings = Settings()
