import datetime

from typing import Optional

from fastapi import UploadFile
from pydantic import UUID4, BaseModel


class CreateListModel(BaseModel):
    name: str
    description: str | None
    is_private: bool


class AddListCoverModel(BaseModel):
    cover: Optional[UploadFile]


class ListResponseModel(BaseModel):
    name: str
    cover: str | None
    description: str | None


class DefaultListResponseModel(BaseModel):
    username: str
    title: str
    slug: str
    cover: Optional[str]


class GetListsResponseModel(BaseModel):
    name: str
    cover: Optional[str]
