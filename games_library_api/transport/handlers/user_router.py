import statistics
from typing import List, Optional

from fastapi import APIRouter, Depends, FastAPI, File, UploadFile, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.integrations.list_operations import (get_liked_game,
                                                            get_passed_game,
                                                            get_user_list,
                                                            get_wantplay_game)
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
async def get_user_lists(
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
        print(result)
        return result


@router.get(
    "/{username}/want_to_play",
    response_model=list[list_model.WantPlayListResponseModel],
)
async def get_user_wantplay_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> List[list_model.WantPlayListResponseModel]:
    if username == user.username:
        result = await get_wantplay_game(db=db, user_id=user.id)
        print(result)
        return result


@router.get(
    "/{username}/passed",
    response_model=list[list_model.WantPlayListResponseModel],
)
async def get_user_passed_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> List[list_model.WantPlayListResponseModel]:
    if username == user.username:
        result = await get_passed_game(db=db, user_id=user.id)
        print(result)
        return result


@router.get(
    "/{username}/like",
    response_model=list[list_model.WantPlayListResponseModel],
)
async def get_user_liked_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> List[list_model.WantPlayListResponseModel]:
    if username == user.username:
        result = await get_liked_game(db=db, user_id=user.id)
        print(result)
        return result


@router.get(
    "/{username}/list/{list_name}",
)
async def get_user_list_page(username: str, list_name: str):
    pass
