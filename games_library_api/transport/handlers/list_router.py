import base64
from typing import Annotated, Any, Optional

from fastapi import APIRouter, Body, Depends, File, Header, Request, Response, UploadFile, status
from fastapi.responses import JSONResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.list_operations import (
    add_delete_list,
    add_game_to_user_list,
    approve_create_list,
    check_game_in_user_liked,
    check_game_in_user_passed,
    check_game_in_user_wantplay,
    create_list,
    delete_user_list,
    get_all_list,
    get_all_non_private_lists,
    get_list_data,
    get_list_games,
    get_list_info,
    universal_game_liked,
    universal_game_passed,
    universal_game_wanted,
    update_list,
)
from games_library_api.models import error_model, game_model, list_model, review_model, users_model
from games_library_api.schemas.user import User
from games_library_api.services.cover_upload import save_upload_cover

router = APIRouter()


@router.post('/list/create/')
async def create_list_route(
    title: str,
    img: UploadFile, 
    description: Optional[str],
    is_private: Optional[bool],
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    img_bytes = img.file.read()
    base64_string= base64.b64encode(img_bytes).decode('utf-8')
    result = await create_list(db=db, owner_id=user.id,  username=user.username,cover=base64_string, title=title, description=description, is_private=is_private)
    if not result:
        error = error_model.ErrorResponseModel(details='List with this name already exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return {'detail': True}


@router.get('/list/approve/create')
async def approve_create_list_router(title: str,user: User = Depends(current_active_user),
                                     db: AsyncSession = Depends(get_async_session),
):
    result = await approve_create_list(title=title, username=user.username, db=db)
    if result:
        error = error_model.ErrorResponseModel(details='List with this name already exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return {'detail': True}


@router.get('/lists/all/', response_model=list[list_model.AllListsResponseModel])
async def get_all_lists_router(db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_all_list(db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )

    return result


@router.get('/lists/user/all/', response_model=list[list_model.AllListsResponseModel])
async def get_all_non_private_lists_router(db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_all_non_private_lists(db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )

    return result


@router.post('/lists/add_game_to_user_list')
async def add_game_to_user_list_router(
    list_id: UUID4,
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    await add_game_to_user_list(db=db, list_id=list_id, game_id=game_id)


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
    result = await delete_user_list(db=db, list_id=list_id, user_id=user.id)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )

    return {'detail': True}


@router.patch('/list/update')
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
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return {'detail': True}


@router.get('/list/games', response_model=list[list_model.ListGamesResponseModel | None])
async def ist_games_router(
    slug: str,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    # Обращение к базе данных
    result = await get_list_games(
        slug=slug,
        db=db,
    )
    if not result:
        error = error_model.ErrorResponseModel(details='User have no activity')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    return result


@router.post('/add/delete/lists/{slug}/user/{user_id}')
async def ist_games_router(
    slug: str,
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    # Обращение к базе данных
    result = await add_delete_list(
        slug=slug,
        user_id=user_id,
        db=db,
    )
    if not result:
        error = error_model.ErrorResponseModel(details='User have no activity')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    return result


@router.get('/list/{slug}/check/added/{user_id}', response_model=list_model.ListDataResponseModel)
async def list_data_router(
    slug: str,
    user_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
) -> Any:
    # Обращение к базе данных
    result = await get_list_data(
        slug=slug,
        user_id=user_id,
        db=db,
    )
    if not result:
        error = error_model.ErrorResponseModel(details='Not in list')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_200_OK,
        )
    print(result[0])
    return result[0]


@router.get('/check/game_in_passed_list/{game_id}')
async def check_game_in_passed_lists(
    game_id: UUID4,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await check_game_in_user_passed(game_id=game_id, user_id=user.id, db=db)
    return result


@router.get('/check/game_in_liked_list/{game_id}')
async def check_game_in_liked_lists(
    game_id: UUID4,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await check_game_in_user_liked(game_id=game_id, user_id=user.id, db=db)
    return result


@router.get('/check/game_in_wanted_list/{game_id}')
async def check_game_in_wanted_lists(
    game_id: UUID4,
    user: User = Depends(current_active_user),
    db: AsyncSession = Depends(get_async_session),
):
    result = await check_game_in_user_wantplay(game_id=game_id, user_id=user.id, db=db)
    return result


# @router.get('/list/data', response_model=list_model.ListResponseModel)
# async def get_list_data_router(    
#     list_id: UUID4,
#     db: AsyncSession = Depends(get_async_session)):
#     result = await get_list_info(list_id=list_id,db=db)

#     if not result:
#         error = error_model.ErrorResponseModel(details='Not in list')
#         return JSONResponse(
#             content=error.model_dump(),
#             status_code=status.HTTP_200_OK,
#         )
#     return result[0]