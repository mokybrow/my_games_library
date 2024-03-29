import datetime

from typing import Optional

from pydantic import UUID4, BaseModel, EmailStr


class UserResponseModel(BaseModel):
    id: UUID4
    name: str
    username: str
    email: EmailStr


class PublicUserResponseModel(BaseModel):
    id: UUID4
    name: str
    surname: Optional[str]
    img: Optional[str]
    username: str
    list_count: int
    follower_count: int
    passed_game_count: int
    wanted_game_count: int
    registr_at: Optional[datetime.date]


class PrivateUserResponseModel(BaseModel):
    id: UUID4
    name: str
    surname: Optional[str]
    img: Optional[str]
    username: str
    email: str
    birthdate: Optional[datetime.date]
    gender: Optional[str]
    is_active: bool
    is_superuser: bool
    is_verified: bool
    reporter: Optional[bool]
    subscriber: Optional[bool]
    list_count: int
    follower_count: int
    passed_game_count: int
    wanted_game_count: int
    registr_at: Optional[datetime.date]


class UserStatsModel(BaseModel):
    count: int


class UserImg(BaseModel):
    img: Optional[str]
