import datetime
from typing import Optional
from pydantic import UUID4, BaseModel, EmailStr


class UserGameGradeResponseModel(BaseModel):
    id: Optional[UUID4]
    user_id: Optional[UUID4]
    game_id: Optional[UUID4]
    grade: Optional[int]
    comment: Optional[str]
    created_at: Optional[datetime.datetime]
