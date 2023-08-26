from fastapi import APIRouter, Depends, FastAPI
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.database import get_async_session
from games_library_api.schemas.user import User
from games_library_api.services.verify_user import verify_user_by_email

from ...auth.utils import current_active_user

router = APIRouter()


@router.get("/user/verify/{token}/{email}")
async def verify_user_by_email_route(token: str, email: str):
    await verify_user_by_email(token=token)
    return {"Почта подтверждена": f"{email}!"}
