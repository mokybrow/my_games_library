import datetime
from typing import Optional

from fastapi import UploadFile
from pydantic import BaseModel, Json


class GamesResponseModel(BaseModel):
    title: str
    cover: Optional[str]
    description: str
    slug: str
    release: datetime.date
    platform: Json
