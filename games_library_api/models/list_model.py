from typing import Optional

from fastapi import UploadFile
from pydantic import BaseModel


class CreateListResponseModel(BaseModel):
    name: str
    description: Optional[str]
    is_private: bool


class CreateListCoverResponseModel(CreateListResponseModel):
    cover: Optional[UploadFile]


class ListResponseModel(BaseModel):
    name: str
    cover: Optional[str]
    description: Optional[str]


class WantPlayListResponseModel(BaseModel):
    title: str
    cover: str
    slug: str
