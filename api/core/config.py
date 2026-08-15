from typing import Annotated
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict
from pydantic import field_validator
from dotenv import find_dotenv
from functools import lru_cache

class Settings(BaseSettings):
    DATABASE_URL: str
    TEST_DATABASE_URL: str | None = None
    PROJECT_NAME: str = "Stashmatic API"
    VERSION: str = "0.1.0"
    APP_ENV: str = "development"

    ALLOWED_ORIGINS: Annotated[list[str], NoDecode] = []

    #CLERK settings
    CLERK_SECRET_KEY: str
    CLERK_AUTHORIZED_PARTIES: Annotated[list[str], NoDecode] = []

    @field_validator("DATABASE_URL")
    @classmethod
    def fix_postgres_suffix(settings_class, raw_url_value: str) -> str:
        """
        Ensures the Postgres URL uses the 'psycopg2' driver required by SQLAlchemy.
        """
        if raw_url_value and raw_url_value.startswith("postgresql://"):
            # SQLAlchemy requires postgresql+psycopg2:// for Postgres
            return raw_url_value.replace("postgresql://", "postgresql+psycopg2://", 1)
        return raw_url_value
    
    @field_validator("ALLOWED_ORIGINS", "CLERK_AUTHORIZED_PARTIES", mode="before")
    @classmethod
    def split_csv(settings_class, raw_csv: str | list[str]) -> list[str]:
        """
        Ensures CSV variables are split into a list of strings
        """
        if isinstance(raw_csv, str) and raw_csv.strip():
            return [origin.strip() for origin in raw_csv.split(",")]
        if isinstance(raw_csv, list):
            return raw_csv
        return []

    model_config = SettingsConfigDict(env_file=find_dotenv(), 
                                      env_file_encoding="utf-8",
                                      extra="ignore")

@lru_cache
def get_settings() -> Settings:
    return Settings()

settings = Settings()