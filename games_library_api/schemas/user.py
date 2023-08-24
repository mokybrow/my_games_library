from typing import TYPE_CHECKING, Optional
from pydantic import EmailStr
from sqlalchemy import UUID, Table, Column, String, MetaData, Boolean, Date

from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTableUUID
from sqlalchemy.orm import DeclarativeBase
import uuid
import datetime


from fastapi_users import schemas

metadata = MetaData()

user_table = Table(
    "user",
    metadata,
    Column("id", UUID, primary_key=True),
    Column("email", String, unique=True, index=True),
    Column("hashed_password", String),
    Column("is_active", Boolean, default=True),
    Column("is_superuser", Boolean, default=False),
    Column("is_verified", Boolean, default=False),

    Column("username", String, nullable=False, unique=True),
    Column("name", String, nullable=False),
    Column("surname", String, nullable=True),

    Column("birthdate", Date, nullable=True)
)


class Base(DeclarativeBase):
    pass


class User(SQLAlchemyBaseUserTableUUID, Base):
    username = Column(String, nullable=False)
    name = Column(String, nullable=False)
    surname = Column(String, nullable=True)
    birthdate = Column(Date, nullable=True)
    


class UserRead(schemas.BaseUser[uuid.UUID]):
    username: str
    name: str
    surname: Optional[str]
    birthdate: Optional[datetime.date]


class UserCreate(schemas.BaseUserCreate):
    username: str
    name: str
    surname: Optional[str]
    birthdate: Optional[datetime.date]


class UserUpdate(schemas.BaseUserUpdate):
    username: Optional[str]
    name: Optional[str]
    surname: Optional[str]
    birthdate: Optional[datetime.date]