import statistics
from typing import List, Optional

from fastapi import APIRouter, Depends, FastAPI, File, UploadFile, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.integrations.list_operations import get_user_list
from games_library_api.schemas.user import User

from ...database import get_async_session
from ...models import error_model, list_model

router = APIRouter()


@router.get("/{username}")
async def user_profile(username: str, user: User = Depends(current_active_user)):
    if username == user.username:
        return {"Hello": f"{username} yor profile {user.username}"}
    return {"Warning": "is not your profile"}


@router.get(
    "/{username}/lists",
    response_model=Optional[
        list[list_model.ListResponseModel] | error_model.ErrorResponseModel
    ],
)
async def user_profile(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> List[list_model.ListResponseModel]:
    if username != user.username:
        error = error_model.ErrorResponseModel(details="you cant see these lists")
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    if username == user.username:
        result = await get_user_list(db=db, user_id=user.id)
        return result


@router.get("/{username}/passed")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/{username}/want_to_play")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/{username}/like")
async def user_profile():
    return {"Privet": "Mir"}
