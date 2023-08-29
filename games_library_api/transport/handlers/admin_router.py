import datetime
import os
import shutil
import uuid
from typing import List

from fastapi import APIRouter, Depends, FastAPI, File, UploadFile
from pydantic import Json
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import (auth_backend, current_active_user,
                                          current_superuser, fastapi_users)
from games_library_api.integrations.admin_operations import get_all_users
from games_library_api.integrations.game_operations import add_game
from games_library_api.schemas.user import (User, UserCreate, UserRead,
                                            UserUpdate)
from games_library_api.services.cover_upload import save_upload_cover

from ...database import get_async_session
from ...models import users_model

router = APIRouter()


@router.post("/admin/add_game/")
async def add_game_router(
    title: str,
    cover: UploadFile,
    description: str,
    slug: str,
    release: datetime.date,
    platform: Json,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_superuser),
):
    if cover:
        dest = save_upload_cover(cover)

    if not cover:
        dest = None

    await add_game(
        db=db,
        title=title,
        cover=dest,
        description=description,
        slug=slug,
        release=release,
        platform=platform,
    )


@router.get("/admin/get_all_users/", response_model=list[users_model.UserResponseModel])
async def get_all_users_router(
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_superuser),
) -> List[users_model.UserResponseModel]:
    result = await get_all_users(db=db)
    return result


router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/admin/users",
)
