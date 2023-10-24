from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.auth.utils import auth_backend, current_active_user, fastapi_users
from backend.database import get_async_session
from backend.schemas.user import User, UserCreate, UserRead, UserUpdate

router = APIRouter()


router.include_router(fastapi_users.get_auth_router(auth_backend), prefix='/auth', tags=['auth'])
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix='/auth',
    tags=['auth'],
)
router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix='/auth',
    tags=['auth'],
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix='/auth',
    tags=['auth'],
)

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix='/users',
    tags=['users'],
)
