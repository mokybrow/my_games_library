import os
import shutil
import uuid

from fastapi import APIRouter, Depends, FastAPI, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import (
    auth_backend,
    current_active_user,
    fastapi_users,
)
from games_library_api.integrations.list_opertions import create_list
from games_library_api.schemas.user import User

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
    upload_dir = os.path.join(os.getcwd(), "uploads")
    # Create the upload directory if it doesn't exist
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    # get the destination path
    dest = os.path.join(upload_dir, cover.filename)
    print(dest)

    # copy the file contents
    with open(dest, "wb") as buffer:
        shutil.copyfileobj(cover.file, buffer)
    await create_list(
        db=db,
        owner_id=user.id,
        name=name,
        cover=dest,
        description=description,
        is_private=is_private,
    )

    return {"Warning": f"filename {cover.filename}"}
