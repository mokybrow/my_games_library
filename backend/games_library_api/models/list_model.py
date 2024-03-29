import datetime

from typing import Optional

from fastapi import UploadFile
from pydantic import UUID4, BaseModel


class CreateListModel(BaseModel):
    title: str
    description: Optional[str]
    is_private: Optional[bool]


class AddListCoverModel(BaseModel):
    cover: Optional[UploadFile]


class ListResponseModel(BaseModel):
    id: UUID4
    owner_id: UUID4
    title: str
    slug: str
    cover: Optional[str]
    description: Optional[str]
    is_private: bool
    created_at: datetime.datetime


class DefaultListGamesResponseModel(BaseModel):
    id: UUID4
    title: str
    slug: str
    cover: Optional[str]


class AllListsResponseModel(BaseModel):
    id: UUID4
    title: str
    slug: str
    cover: Optional[str]


class ListGamesResponseModel(BaseModel):
    game_id: UUID4
    title: str
    cover: Optional[str]
    slug: str


class ListDataResponseModel(BaseModel):
    user_id: UUID4


class GetListCountResponseModel(BaseModel):
    count: int


class CheckGameInDefaultListsResponseModel(BaseModel):
    passed: int
    liked: int
    wishilst: int


class CheckGameInUserListsResponseModel(BaseModel):
    list_id: UUID4
    title: str
    in_list: int
