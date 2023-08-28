from fastapi import APIRouter, Depends, FastAPI, File, UploadFile
from pydantic import UUID4
from sqlalchemy import UUID
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.integrations.after_registration import create_default_lists
from games_library_api.integrations.list_operations import create_list, get_list
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
    await create_list(
        db=db,
        owner_id=user.id,
        name=name,
        cover=dest,
        description=description,
        is_private=is_private,
    )

    return {"Warning": f"filename"}


@router.get("/lists/all/")
async def get_all_lists(db: AsyncSession = Depends(get_async_session)):
    await get_list(db=db)


@router.post("/lists/create_default_list")
async def create_default_list_router(
    user_id: UUID4, db: AsyncSession = Depends(get_async_session)
):
    await create_default_lists(user_id=user_id, db=db)
