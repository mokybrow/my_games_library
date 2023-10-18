import datetime

from typing import Optional

from fastapi import UploadFile
from pydantic import UUID4, BaseModel


class CreateListModel(BaseModel):
    name: str
    description: Optional [str]
    is_private: Optional [bool]


class AddListCoverModel(BaseModel):
    cover: Optional[UploadFile]


class ListResponseModel(BaseModel):
    id: UUID4
    owner_id: UUID4
    name: str
    slug: str
    cover: Optional[str]
    description: Optional[str]
    is_private: bool
    created_at: datetime.datetime


class DefaultListResponseModel(BaseModel):
    username: str
    title: str
    slug: str
    cover: Optional[str]


class GetListsResponseModel(BaseModel):
    name: str
    cover: Optional[str]


class ListGamesResponseModel(BaseModel):
    game_id: UUID4
    title: str
    cover: Optional[str]
    slug: str


class ListDataResponseModel(BaseModel):
    user_id: UUID4
