import datetime
import uuid
from typing import TYPE_CHECKING, Optional

from fastapi import Depends
from fastapi_users import schemas
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from pydantic import EmailStr
from sqlalchemy import UUID, Boolean, Column, Date, MetaData, String, Table
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    username = Column(String, nullable=False)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=True)
    birthdate = Column(Date, nullable=True)
    pass


class UserRead(schemas.BaseUser[uuid.UUID]):
    username: str
    name: str
    surname: Optional[str]
    birthdate: Optional[datetime.date]
    pass


class UserCreate(schemas.BaseUserCreate):
    username: str
    name: str
    surname: Optional[str]
    birthdate: Optional[datetime.date]
    pass


class UserUpdate(schemas.BaseUserUpdate):
    username: Optional[str]
    name: Optional[str]
    surname: Optional[str]
    birthdate: Optional[datetime.date]
    pass
