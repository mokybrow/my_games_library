from typing import Optional

from fastapi import UploadFile
from pydantic import BaseModel


class CreateListResponseModel(BaseModel):
    name: str
    description: str | None
    is_private: bool


class CreateListCoverResponseModel(CreateListResponseModel):
    cover: UploadFile | None


class ListResponseModel(BaseModel):
    name: str
    cover: str | None
    description: str | None


class WantPlayListResponseModel(BaseModel):
    title: str
    cover: str
    slug: str


class GetListsResponseModel(BaseModel):
    name: str
    cover: Optional[str]
