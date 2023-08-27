import os
import shutil
import uuid

from fastapi import APIRouter, Depends, FastAPI, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import (
    auth_backend,
    current_active_user,
    current_superuser,
    fastapi_users,
)
from games_library_api.integrations.game_operations import add_game
from games_library_api.schemas.user import User
from games_library_api.services.cover_upload import save_upload_cover

from ...database import get_async_session

router = APIRouter()


@router.post("/admin/add_game/")
async def add_new_game(
    title: str,
    cover: UploadFile,
    description: str,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_superuser),
):
    if cover:
        dest = save_upload_cover(cover)

    if not cover:
        dest = None

    await add_game(db=db, title=title, cover=dest, description=description)
