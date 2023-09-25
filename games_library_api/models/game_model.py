import datetime

from typing import Optional

from pydantic import UUID4, BaseModel


class GamesResponseModel(BaseModel):
    title: str
    cover: str | None
    description: str
    slug: str
    release: datetime.date
    platform: list


class GetGamesResponseModel(BaseModel):
    id: UUID4
    title: str
    cover: Optional[str]
    slug: str


class GetGamesPageResponseModel(BaseModel):
    id: UUID4
    title: str
    cover: Optional[str]
    description: str
    slug: str
    release: datetime.date
    platform: dict
    genre: Optional[dict]


class GetGameReviewsResponseModel(BaseModel):
    user_id: UUID4
    grade: int
    comment: Optional[str]
    created_at: datetime.datetime
    id: UUID4
    username: str
    img: Optional[str]
