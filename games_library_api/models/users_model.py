import datetime
from typing import Optional

from pydantic import UUID4, BaseModel, EmailStr


class UserResponseModel(BaseModel):
    id: UUID4
    name: str
    username: str
    email: EmailStr


class PublicUserResponseModel(BaseModel):
    name: str
    img: Optional[str]
    username: str


class PrivateUserResponseModel(BaseModel):
    name: str
    surname: Optional[str]
    img: Optional[str]
    username: str
    birthdate: Optional[datetime.date]
    gender: Optional[str]