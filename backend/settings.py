from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(
    BaseSettings,
):
    project_name: str
    database_url: str
    secret: str
    algoritm: str

    mail_username: str
    mail_password: str
    mail_from: str
    mail_server: str

    reg_body: str
    ver_body: str
    fog_pass: str
    res_pass: str

    class Config:
        env_prefix = 'GAMIFICATION_'
        env_file = '.env'


@lru_cache
def get_settings() -> Settings:
    return Settings()
