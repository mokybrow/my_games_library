from typing import Optional

from fastapi import APIRouter, Depends, FastAPI, File, UploadFile
from pydantic import UUID4
from sqlalchemy import UUID
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.integrations.after_registration import \
    create_default_lists
from games_library_api.integrations.list_operations import (
    add_game_to_liked_list, add_game_to_passed_list, add_game_to_user_list,
    add_game_to_wantplay_list, create_list, delete_user_list, get_list,
    update_list)
from games_library_api.schemas.user import User
from games_library_api.services.cover_upload import save_upload_cover

from ...database import get_async_session

router = APIRouter()


@router.post("/lists/create/")
async def create_list_route(
    name: str,
    cover: UploadFile = None,
    description: str = None,
    is_private: bool = False,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    if cover:
        dest = save_upload_cover(cover)

    if not cover:
        dest = None
    # Обращение к базе данных
    result = await create_list(
        db=db,
        owner_id=user.id,
        name=name,
        cover=dest,
        description=description,
        is_private=is_private,
    )
    if not result:
        return {"List alreay": "exist"}
    return {"List created": "success"}


@router.get("/lists/all/")
async def get_all_lists(db: AsyncSession = Depends(get_async_session)):
    await get_list(db=db)


@router.post("/lists/create_default_list")
async def create_default_list_router(
    user_id: UUID4, db: AsyncSession = Depends(get_async_session)
):
    await create_default_lists(user_id=user_id, db=db)


@router.post("/lists/add_game_to_user_list")
async def add_game_to_user_list_router(
    list_id: UUID4,
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await add_game_to_user_list(db=db, list_id=list_id, game_id=game_id)
    if not result:
        return {"Game added": "Error"}
    return {"Game added": "Success"}


@router.post("/lists/add_game_to_passed_list")
async def add_game_to_passed_list_router(
    list_id: UUID4,
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await add_game_to_passed_list(db=db, list_id=list_id, game_id=game_id)

    if not result:
        return {"Game added": "Error"}
    return {"Game added": "Success"}


@router.post("/lists/add_game_to_liked_list")
async def add_game_to_liked_list_router(
    list_id: UUID4,
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await add_game_to_liked_list(db=db, list_id=list_id, game_id=game_id)

    if not result:
        return {"Game added": "Error"}
    return {"Game added": "Success"}


@router.post("/lists/add_game_to_wantplay_list")
async def add_game_to_wantplay_list_router(
    list_id: UUID4,
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await add_game_to_wantplay_list(db=db, list_id=list_id, game_id=game_id)
    if not result:
        return {"Game added": "Error"}

    return {"Game added": "Success"}


@router.delete("/list/delete/")
async def delete_user_list_router(
    list_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await delete_user_list(db=db, list_id=list_id)
    if not result:
        return {"Game deleted": "Error"}

    return {"Game deleted": "Success"}


@router.patch("/list/update_list/")
async def update_user_list_router(
    list_id: UUID4,
    name: str = None,
    new_cover: UploadFile = None,
    description: str = None,
    is_private: bool = False,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    if new_cover:
        dest = save_upload_cover(new_cover)

    if not new_cover:
        dest = None
    # Обращение к базе данных
    result = await update_list(
        list_id=list_id,
        name=name,
        cover=dest,
        description=description,
        is_private=is_private,
        db=db,
    )

    if not result:
        return {"List name already": "exist"}
    return {"List updated": "success"}
