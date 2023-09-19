from typing import Any

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.list_operations import (
    get_liked_game,
    get_passed_game,
    get_user_list,
    get_wantplay_game,
)
from games_library_api.integrations.user_operations import get_another_user, get_user
from games_library_api.models import error_model, list_model, users_model
from games_library_api.schemas.user import User

router = APIRouter()


@router.get(
    '/{username}',
    response_model=list[users_model.PrivateUserResponseModel | error_model.ErrorResponseModel],
)
async def user_profile(
    username: str, db: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)
) -> Any:
    result = await get_user(username=username, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    if user.username != username:
        result = await get_another_user(username=username, db=db)

    return result


@router.get(
    '/user/{username}',
    response_model=list[users_model.PublicUserResponseModel | error_model.ErrorResponseModel],
)
async def user_profile(username: str, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_user(username=username, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result


@router.get(
    '/{username}/lists',
    response_model=list[list_model.ListResponseModel] | error_model.ErrorResponseModel,
)
async def get_user_lists(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_user_list(db=db, username=username)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result


@router.get(
    '/{username}/want_to_play',
    response_model=list[list_model.DefaultListResponseModel],
)
async def get_user_wantplay_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_wantplay_game(db=db, username=username)
    return result


@router.get(
    '/{username}/passed',
    response_model=list[list_model.DefaultListResponseModel],
)
async def get_user_passed_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_passed_game(db=db, username=username)
    return result


@router.get(
    '/{username}/like',
    response_model=list[list_model.DefaultListResponseModel],
)
async def get_user_liked_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_liked_game(db=db, username=username)
    return result


@router.get(
    '/{username}/list/{list_name}',
)
async def get_user_list_page(username: str, list_name: str) -> Any:
    return None
