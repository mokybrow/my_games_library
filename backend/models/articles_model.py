import datetime

from typing import Any, Optional

from pydantic import UUID4, BaseModel


class ArticleResponseModel(BaseModel):
    id: UUID4
    user_id: UUID4
    user_id: UUID4
    title: str
    cover: str
    text: str
    slug: str
    publishing: bool
    tags: Optional[list]
    username: str
    img: str
    like_count: int
    created_at: Optional[datetime.datetime]
    hasAuthorLike: Optional[int] = None


class GetArticleCountResponseModel(BaseModel):
    count: int
