from typing import Any, Optional

from fastapi import APIRouter, Depends,  UploadFile
from fastapi.responses import JSONResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Body, Depends, Header, Request, Response, UploadFile, status

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.list_operations import (
    add_cover_to_list,
    add_game_to_user_list,
    check_game_in_user_liked,
    check_game_in_user_passed,
    check_game_in_user_wantplay,
    check_list,
    create_list,
    delete_user_list,
    get_list,
    universal_game_liked,
    universal_game_passed,
    universal_game_wanted,
    update_list,
)
from games_library_api.models import error_model, game_model, list_model, users_model, review_model

from games_library_api.models import list_model
from games_library_api.schemas.user import User
from games_library_api.services.cover_upload import save_upload_cover

router = APIRouter()



@router.post('/list/create/')
async def create_list_route(
    new_list: list_model.CreateListModel,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await create_list(db=db, owner_id=user.id, new_list=new_list, username=user.username)
    if not result:
        return {'list_created': False}
    return {'list_created': result}


@router.post('/list/check/')
async def create_list_route(
    name: str,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await check_list(db=db,  name=name, username=user.username)
    if not result:
        error = error_model.ErrorResponseModel(details='List does not exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return True


@router.post('/list/add_cover/')
async def create_list_route(
    list_id: UUID4,
    cover: UploadFile = None,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    if cover:
        dest = save_upload_cover(cover)

    if not cover:
        dest = None
    # Обращение к базе данных
    result = await add_cover_to_list(db=db, list_id=list_id, cover=dest)
    return {'List success updated': 'success'}


@router.get('/lists/all/', response_model=list[list_model.GetListsResponseModel])
async def get_all_lists(db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_list(db=db)
    return result


@router.post('/lists/add_game_to_user_list')
async def add_game_to_user_list_router(
    list_id: UUID4,
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await add_game_to_user_list(db=db, list_id=list_id, game_id=game_id)
    if not result:
        return {'Game added': 'Error'}
    return {'Game added': 'Success'}


@router.post('/lists/operation/passed/{game_id}')
async def universal_passed_router(
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await universal_game_passed(db=db, user_id=user.id, game_id=game_id)
    if not result:
        return {'Game deleted': 'Success'}

    return {'Game added': 'Success'}

@router.post('/lists/operation/wantplay/{game_id}')
async def universal_wantplay_router(
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await universal_game_wanted(db=db, user_id=user.id, game_id=game_id)
    if not result:
        return {'Game deleted': 'Success'}

    return {'Game added': 'Success'}


@router.post('/lists/operation/liked/{game_id}')
async def universal_liked_router(
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await universal_game_liked(db=db, user_id=user.id, game_id=game_id)
    if not result:
        return {'Game deleted': 'Success'}

    return {'Game added': 'Success'}



@router.delete('/list/delete/')
async def delete_user_list_router(
    list_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await delete_user_list(db=db, list_id=list_id)
    if not result:
        return {'Game deleted': 'Error'}

    return {'Game deleted': 'Success'}


@router.patch('/list/update_list/')
async def update_user_list_router(
    list_id: UUID4,
    new_list: list_model.CreateListModel,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    # Обращение к базе данных
    result = await update_list(
        list_id=list_id,
        new_list=new_list,
        db=db,
    )

    if not result:
        return {'List name already': 'exist'}
    return {'List updated': 'success'}



@router.get('/check/game_in_passed_list/{game_id}')
async def check_game_in_passed_lists(game_id: UUID4, user: User = Depends(current_active_user),    db: AsyncSession = Depends(get_async_session),
):
    result = await check_game_in_user_passed(game_id=game_id, user_id=user.id, db=db)
    return result

@router.get('/check/game_in_liked_list/{game_id}')
async def check_game_in_liked_lists(game_id: UUID4, user: User = Depends(current_active_user),    db: AsyncSession = Depends(get_async_session),
):
    result = await check_game_in_user_liked(game_id=game_id, user_id=user.id, db=db)
    return result

@router.get('/check/game_in_wanted_list/{game_id}')
async def check_game_in_wanted_lists(game_id: UUID4, user: User = Depends(current_active_user),    db: AsyncSession = Depends(get_async_session),
):
    result = await check_game_in_user_wantplay(game_id=game_id, user_id=user.id, db=db)
    return result