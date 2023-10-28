import base64
import io

from typing import Annotated, Any, Optional

import jwt

from fastapi import APIRouter, Body, Depends, Header, Request, Response, UploadFile, status
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from backend.auth.utils import current_active_user
from backend.database import get_async_session
from backend.integrations.list_operations import (
    get_liked_game,
    get_passed_game,
    get_user_added,
    get_user_list,
    get_user_not_private_list,
    get_wantplay_game,
)
from backend.integrations.user_operations import (
    check_follow,
    follow_unfollow_on_user,
    get_another_user,
    get_user_activity,
    get_user_by_email,
    get_user_by_username,
    get_user_img,
    get_user_last_reviews,
    get_user_profile,
    update_user_img,
)
from backend.models import error_model, game_model, list_model, review_model, users_model
from backend.schemas.user import User
from backend.services.cover_upload import save_upload_cover
from backend.settings import get_settings

router = APIRouter()
settings = get_settings()


@router.get('/user/my/profile', response_model=users_model.PrivateUserResponseModel)
async def user_profile(db: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)) -> Any:
    result = await get_user_profile(user_id=user.id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


@router.get('/user/{username}', response_model=users_model.PublicUserResponseModel)
async def another_user_profile(username: str, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_another_user(username=username, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


@router.post('/user/get/by/email/{email}', tags=['reg_validation'])
async def get_user_by_email_router(email: str, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_user_by_email(email=email, db=db)
    print(result)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return True


@router.post('/user/get/by/username/{username}', tags=['reg_validation'])
async def get_user_by_username_router(username: str, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_user_by_username(username=username, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return True


@router.get('/user/lists/all', response_model=list[list_model.ListResponseModel])
async def get_user_lists_router(
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_user_list(db=db, user_id=user_id)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no lists')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    return result


@router.get('/user/lists/private/all', response_model=list[list_model.ListResponseModel])
async def get_user_private_lists_router(
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_user_not_private_list(db=db, user_id=user_id)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )

    return result


@router.get('/user/added/lists', response_model=list[list_model.ListResponseModel])
async def get_user_added_lists(
    user_id: str,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_user_added(db=db, user_id=user_id)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no lists')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    return result


@router.get(
    '/user/wantplay/games',
    response_model=list[list_model.DefaultListGamesResponseModel],
)
async def get_user_wantplay_game(
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_wantplay_game(db=db, user_id=user_id)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no games')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    return result


@router.get(
    '/user/passed/games',
    response_model=list[list_model.DefaultListGamesResponseModel],
)
async def get_user_passed_game(
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_passed_game(db=db, user_id=user_id)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no games')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    return result


@router.get(
    '/user/like/games',
    response_model=list[list_model.DefaultListGamesResponseModel],
)
async def get_user_liked_game(
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_liked_game(db=db, user_id=user_id)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no games')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    return result


@router.post('/user/follow/unfollow')
async def follow_to_rout(
    user_id: UUID4, user: User = Depends(current_active_user), db: AsyncSession = Depends(get_async_session)
):
    result = await follow_unfollow_on_user(follower_id=user.id, user_id=user_id, db=db)
    if not result:
        return False
    return True


@router.get('/user/follow/check')
async def check_follow_route(
    user_id: UUID4, user: User = Depends(current_active_user), db: AsyncSession = Depends(get_async_session)
) -> None:
    result = await check_follow(follower_id=user.id, user_id=user_id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='False')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    error = error_model.ErrorResponseModel(details='True')
    return JSONResponse(
        content=error.model_dump(),
        status_code=status.HTTP_200_OK,
    )


@router.get('/user/get/activity', response_model=list[game_model.GetUserLastGameResponseModel])
async def get_user_activity_router(
    user_id: UUID4,
    offset: int = None,
    limit: int = None,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_user_activity(user_id=user_id, offset=offset, limit=limit, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no activity')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    return result


@router.get('/user/last/reviews', response_model=list[review_model.GetLastReviewsResponseModel])
async def get_user_last_game_router(
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    offset: int = None,
    limit: int = None,
) -> None:
    result = await get_user_last_reviews(user_id=user_id, offset=offset, limit=limit, db=db)

    return result


@router.post('/user/change/img')
async def update_user_img_router(
    img: UploadFile, user: User = Depends(current_active_user), db: AsyncSession = Depends(get_async_session)
):
    if img:
        img_bytes = img.file.read()
        base64_string = base64.b64encode(img_bytes).decode('utf-8')

    if not img:
        base64_string = None
    await update_user_img(img=base64_string, user_id=user.id, db=db)
