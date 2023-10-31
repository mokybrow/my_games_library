import datetime

from typing import Any

from fastapi import APIRouter, Depends, UploadFile
from pydantic import Json
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_superuser, fastapi_users
from games_library_api.database import get_async_session
from games_library_api.integrations.admin_operations import game_parser, get_all_users
from games_library_api.integrations.game_operations import add_game
from games_library_api.models import users_model
from games_library_api.schemas.user import User, UserRead, UserUpdate
from games_library_api.services.cover_upload import save_upload_cover

router = APIRouter()


@router.post('/admin/add_game/')
async def add_game_router(
    title: str,
    cover: UploadFile,
    description: str,
    slug: str,
    release: datetime.date,
    platform: Json,
    genre: Json,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_superuser),
) -> Any:
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
        genre=genre,
    )


@router.get('/admin/users', response_model=list[users_model.UserResponseModel])
async def get_all_users_router(
    page: int,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_superuser),
) -> Any:
    result = await get_all_users(page=page, db=db)
    return result


@router.get('/admin/game_parser')
async def parse_games(
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_superuser),
):
    await game_parser(db=db)
