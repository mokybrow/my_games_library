import datetime
from typing import Optional
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

class GetArticleCountResponseModel(BaseModel):
    count: int