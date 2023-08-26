from functools import lru_cache

from fastapi.templating import Jinja2Templates
from pydantic_settings import BaseSettings


class Settings(
    BaseSettings,
):
    project_name: str = "My Games Library"

    # project_name: str
    # debug: bool
    # states_path: FilePath
    # database_url = os.environ.get('DATABASE_URL')
    class Config:
        env_prefix = "QUICK_SUPPORT_"
        env_file = ".env"
        # allow_mutation = False


@lru_cache
def get_settings() -> Settings:
    return Settings()
