import datetime

from typing import Any, Optional

from pydantic import UUID4, BaseModel


class ArticleResponseModel(BaseModel):
    id: UUID4
    user_id: UUID4
    user_id: UUID4
    title: str
    cover: Optional[str]
    text: str
    slug: str
    publishing: bool
    tags: Optional[list]
    username: str
    img: Optional[str]
    like_count: int
    created_at: Optional[datetime.datetime]
    hasAuthorLike: Optional[int] = None


class GetArticleCountResponseModel(BaseModel):
    count: int | float
