from typing import Optional

from pydantic import UUID4, BaseModel, EmailStr


class UserResponseModel(BaseModel):
    id: UUID4
    name: str
    username: str
    email: EmailStr
