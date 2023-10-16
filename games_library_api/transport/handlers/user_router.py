import base64
import io
from typing import Annotated, Any, Optional

from fastapi import APIRouter, Body, Depends, Header, Request, Response, UploadFile, status
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession
import jwt
from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.list_operations import (
    get_liked_game,
    get_passed_game,
    get_user_list,
    get_wantplay_game,
)
from games_library_api.integrations.user_operations import check_follow,  follow_unfollow_on_user, get_another_user, get_user, get_user_activity, get_user_by_email, get_user_by_username, get_user_img, get_user_last_reviews, update_user_img
from games_library_api.models import error_model, game_model, list_model, users_model, review_model

from games_library_api.schemas.user import User
from games_library_api.services.cover_upload import save_upload_cover
from games_library_api.settings import get_settings

router = APIRouter()
settings = get_settings()


@router.get(
    '/username',
    response_model=users_model.PrivateUserResponseModel
)
async def user_profile(db: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)
) -> Any:
    result = await get_user(id=user.id, db=db)

    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


@router.get(
    '/user/{username}', response_model=users_model.PublicUserResponseModel
)
async def another_user_profile(username: str, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_another_user(username=username, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]

@router.post(
    '/user/get_by_email/{email}',
    tags=['reg_validation']
)
async def get_user_by_email_router(email: str, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_user_by_email(email=email, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return True

@router.post(
    '/user/get_by_username/{username}',
    tags=['reg_validation']
)
async def get_user_by_username_router(username: str, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_user_by_username(username=username, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return True


@router.get(
    '/{username}/lists',
    response_model=list_model.ListResponseModel
)
async def get_user_lists(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_user_list(db=db, username=username)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no lists')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


@router.get(
    '/{username}/want_to_play',
    response_model=list_model.DefaultListResponseModel,
)
async def get_user_wantplay_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_wantplay_game(db=db, username=username)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no games')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


@router.get(
    '/{username}/passed',
    response_model=list_model.DefaultListResponseModel,
)
async def get_user_passed_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_passed_game(db=db, username=username)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no games')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


@router.get(
    '/{username}/like',
    response_model=list_model.DefaultListResponseModel,
)
async def get_user_liked_game(
    username: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_liked_game(db=db, username=username)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no games')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


@router.get(
    '/{username}/list/{list_name}',
)
async def get_user_list_page(username: str, list_name: str) -> Any:
    return None


@router.post('/follow/unfollow/{user_id}')
async def follow_to_rout(user_id: UUID4, user: User = Depends(current_active_user),db: AsyncSession = Depends(get_async_session)):
    result = await follow_unfollow_on_user(follower_id=user.id, user_id=user_id, db=db)
    if not result:
        return False
    return True

@router.get('/follow_check/{user_id}')
async def check_follow_route(user_id: UUID4, user: User = Depends(current_active_user),db: AsyncSession = Depends(get_async_session)) -> None:
    result = await check_follow(follower_id=user.id, user_id=user_id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='False')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    print('true')
    error = error_model.ErrorResponseModel(details='True')
    return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )


@router.get('/last/game/{user_id}', response_model=list[game_model.GetUserLastGameResponseModel])
async def get_user_activity_router(
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    result = await get_user_activity(user_id=user_id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='User have no activity')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result


@router.get('/last/reviews/{user_id}', response_model=list[review_model.GetLastReviewsResponseModel])
async def get_user_last_game_router(user_id: UUID4, db: AsyncSession = Depends(get_async_session)) -> None:
    result = await get_user_last_reviews(user_id=user_id, db=db)

    return result


@router.get('/user/get/img')
async def get_user_img_router(id: UUID4, db: AsyncSession = Depends(get_async_session)):
    result = await get_user_img(id=id, db=db)
    if result:
        with open(result[0][0], 'rb') as f:
            base64image = base64.b64encode(f.read())
    return base64image


@router.post('/user/change/img')
async def update_user_img_router(img: UploadFile, user: User = Depends(current_active_user), db: AsyncSession = Depends(get_async_session)):
    if img:
        dest = save_upload_cover(img)
    if not img:
        dest = None

    await update_user_img(
        img=dest,
        user_id=user.id,
        db=db
    )