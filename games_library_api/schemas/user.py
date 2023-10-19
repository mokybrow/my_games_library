import datetime
import uuid

from typing import Optional

from fastapi_users import schemas
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Column, Date, String
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    username = Column(String, nullable=False, unique=True)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=True)
    birthdate = Column(Date, nullable=True, default=None)
    gender = Column(String, nullable=True)


class UserRead(schemas.BaseUser[uuid.UUID]):
    name: str
    surname: Optional[str]
    birthdate: Optional[datetime.date]
    gender: Optional[str]


class UserCreate(schemas.BaseUserCreate):
    username: str
    name: str
    # surname: Optional[str]
    # birthdate: Optional[datetime.date]
    # gender: Optional[str]


class UserUpdate(schemas.BaseUserUpdate):
    name: Optional[str] = None
    surname: Optional[str] = None
    birthdate: Optional[datetime.date] = None
    gender: Optional[str] = None
