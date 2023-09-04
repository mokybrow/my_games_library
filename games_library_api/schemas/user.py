import datetime
import uuid

from fastapi_users import schemas
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy import Column, Date, String
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    username = Column(String, nullable=False)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=True)
    birthdate = Column(Date, nullable=True, default=None)
    gender = Column(String, nullable=True)
    pass


class UserRead(schemas.BaseUser[uuid.UUID]):
    username: str
    name: str
    surname: str | None
    birthdate: datetime.date | None
    gender: str | None
    pass


class UserCreate(schemas.BaseUserCreate):
    username: str
    name: str
    surname: str | None
    birthdate: datetime.date | None
    gender: str | None
    pass


class UserUpdate(schemas.BaseUserUpdate):
    username: str | None
    name: str | None
    surname: str | None
    birthdate: datetime.date | None
    gender: str | None
    pass
