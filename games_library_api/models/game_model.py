import datetime

from typing import Optional

from pydantic import UUID4, BaseModel


class GamesResponseModel(BaseModel):
    title: str
    cover: str | None
    description: str
    slug: str
    release: Optional[datetime.date]
    platform: list


class GetGamesResponseModel(BaseModel):
    id: UUID4
    title: str
    cover: Optional[str]
    slug: str
    release: Optional[datetime.date]


class GetGamesCountResponseModel(BaseModel):
    count: int


class GetUserLastGameResponseModel(BaseModel):
    id: UUID4
    user_id: UUID4
    game_id: UUID4
    title: str
    cover: Optional[str]
    slug: str
    activity_type: str
    created_at: Optional[datetime.datetime]


class GetGameProfileResponseModel(BaseModel):
    id: UUID4
    title: str
    cover: Optional[str]
    description: Optional[str]
    slug: str
    release: Optional[datetime.date]
    platform: Optional[list]
    platform_name: Optional[list]
    genre: Optional[list]
    esrb_rating: Optional[str]
    avg_rate: Optional[float]

class GetGameReviewsResponseModel(BaseModel):
    id: UUID4
    username: str
    img: Optional[str]
    user_id: UUID4
    grade: int
    comment: Optional[str]
    created_at: Optional[datetime.datetime]
    review_id: UUID4
    review_likes: Optional[int]
    hasAuthorLike: Optional[int]


class GetGameReviewsPublicResponseModel(BaseModel):
    id: UUID4
    username: str
    img: Optional[str]
    user_id: UUID4
    grade: int
    comment: Optional[str]
    created_at: datetime.datetime
    review_id: UUID4
    review_likes: Optional[int]

