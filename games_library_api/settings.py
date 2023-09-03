from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(
    BaseSettings,
):
    project_name: str = 'My Games Library'

    class Config:
        env_prefix = 'QUICK_SUPPORT_'
        env_file = '.env'


@lru_cache
def get_settings() -> Settings:
    return Settings()
