import datetime

from pydantic import BaseModel, Json


class GamesResponseModel(BaseModel):
    title: str
    cover: str | None
    description: str
    slug: str
    release: datetime.date
    platform: Json
