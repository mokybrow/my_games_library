import datetime

from pydantic import BaseModel


class GamesResponseModel(BaseModel):
    title: str
    cover: str | None
    description: str
    slug: str
    release: datetime.date
    platform: list
