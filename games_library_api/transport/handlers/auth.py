from fastapi import APIRouter, Depends, FastAPI
import httpx
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import auth_backend, current_active_user, fastapi_users
from games_library_api.schemas.user import User, UserCreate, UserRead, UserUpdate
from games_library_api.services.verify_user import verify_user_by_email

router = APIRouter()


router.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

@router.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


@router.get("/user/verify/{token}")
async def verify_user_by_email_route(token: str):
    await verify_user_by_email(token=token)
    return {"message": f"Hello {token}!"}
