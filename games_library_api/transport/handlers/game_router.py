from typing import Any

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.database import get_async_session
from games_library_api.integrations.game_operations import gef_all_games, get_game, get_game_review
from games_library_api.models import error_model, game_model

router = APIRouter()


@router.get("/games/", response_model=list[game_model.GetGamesResponseModel])
async def get_all_games_router(db: AsyncSession = Depends(get_async_session)):
    result = await gef_all_games(db=db)
    return result


@router.get("/game/{id}", response_model=list[game_model.GetGamesPageResponseModel | error_model.ErrorResponseModel])
async def get_game_router(id: UUID4, db: AsyncSession = Depends(get_async_session)):
    result = await get_game(id=id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='Game not Found')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result


@router.get(
    "/game/{id}/reviews/", response_model=list[game_model.GetGameReviewsResponseModel | error_model.ErrorResponseModel]
)
async def get_game_review_router(id: UUID4, db: AsyncSession = Depends(get_async_session)) -> Any:
    result = await get_game_review(id=id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='This Game Have No Reviews')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result


# @router.get("/games/{genre}/")
# async def user_profile():


# @router.get("/games/best/")
# async def user_profile():


# @router.get("/games/best/{time_interval}")
# async def user_profile():


# @router.get("/games/novelty/")
# async def user_profile():


# @router.get("/games/{title}/reviews")
# async def user_profile():
