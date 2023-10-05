from fastapi import APIRouter, Depends

from games_library_api.auth.utils import auth_backend, current_active_user, fastapi_users
from games_library_api.schemas.user import User, UserCreate, UserRead, UserUpdate
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session


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
