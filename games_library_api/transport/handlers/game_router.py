from typing import Any, Optional

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.database import get_async_session
from games_library_api.integrations.game_operations import  get_all_games, get_all_games_filter, get_count_games, get_game, get_game_avg_rate, get_game_review, get_game_review_for_all, get_new_games
from games_library_api.models import error_model, game_model
from games_library_api.auth.utils import current_active_user
from games_library_api.schemas.user import User

router = APIRouter()


@router.get("/games/page/{page}/sort/{sort}/decade/{decade}/genre/{genre}", response_model=list[game_model.GetGamesResponseModel])
async def get_all_games_router(page: int, sort: Optional[str], decade: Optional[str], genre: Optional[str], db: AsyncSession = Depends(get_async_session)):
    result = await get_all_games(db=db, page=page, sort=sort, decade=decade, genre=genre)
    return result


@router.get("/games/page/filter/")
async def get_all_games_filter_router( db: AsyncSession = Depends(get_async_session)):
    result = await get_all_games_filter(db=db)



@router.get("/games/count", response_model=game_model.GetGamesCountResponseModel)
async def get_all_games_router(db: AsyncSession = Depends(get_async_session)):
    result = await get_count_games(db=db)
    return result[0]


@router.get("/games/new/", response_model=list[game_model.GetGamesResponseModel])
async def get_all_games_router(db: AsyncSession = Depends(get_async_session)):
    result = await get_new_games(db=db)
    return result


@router.get("/game/{slug}", response_model=game_model.GetGamesPageResponseModel)
async def get_game_router(slug: str, db: AsyncSession = Depends(get_async_session)):
    result = await get_game(slug=slug, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='Game not Found')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


@router.get(
    "/game/{game_id}/reviews/", response_model=list[game_model.GetGameReviewsResponseModel | error_model.ErrorResponseModel]
)
async def get_game_review_router(game_id: UUID4, db: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)) -> Any:
    result = await get_game_review(game_id=game_id, user_id=user.id, db=db)
    
    if not result:
        error = error_model.ErrorResponseModel(details='This Game Have No Reviews')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result


@router.get(
    "/game/{game_id}/reviews/all", response_model=list[game_model.GetGameReviewsPublicResponseModel | error_model.ErrorResponseModel]
)
async def get_game_review_for_all_router(game_id: UUID4, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_game_review_for_all(game_id=game_id,  db=db)
    
    if not result:
        error = error_model.ErrorResponseModel(details='This Game Have No Reviews')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result


@router.get(
    "/game/{id}/avg_rate/", response_model=game_model.GetGameAvgRateResponseModel
)
async def get_game_avg_rate_router(id: UUID4, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_game_avg_rate(id=id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='This Game Have No Reviews')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result[0]


# @router.get("/games/{genre}/")
# async def user_profile():


# @router.get("/games/best/")
# async def user_profile():


# @router.get("/games/best/{time_interval}")
# async def user_profile():


# @router.get("/games/novelty/")
# async def user_profile():


