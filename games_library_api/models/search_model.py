import datetime

from typing import Optional

from pydantic import UUID4, BaseModel, EmailStr


class SearchResponseModel(BaseModel):
    title: Optional[str]
    cover: Optional[str]
    slug: Optional[str]

