from typing import Optional

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.review_operations import (
    add_like_to_user_comment,
    create_review,
    delete_user_grade,
    get_all_reviews,
    get_all_reviews_count,
    get_user_grade,
)
from games_library_api.models import error_model, review_model
from games_library_api.schemas.user import User

router = APIRouter()


@router.post("/review/add")
async def create_review_router(
    game_id: UUID4,
    grade: int,
    comment: Optional[str] = None,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await create_review(user_id=user.id, game_id=game_id, grade=grade, comment=comment, db=db)
    return result


@router.get('/review/game/user/grade', response_model=Optional[review_model.UserGameGradeResponseModel])
async def get_user_grade_router(
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await get_user_grade(user_id=user.id, game_id=game_id, db=db)
    if not result:
        return None
    return result[0]


@router.delete('/review/delete')
async def delete_user_grade_router(
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    await delete_user_grade(user_id=user.id, game_id=game_id, db=db)


@router.post('/review/like/user/review')
async def add_like_to_user_comment_router(
    review_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    await add_like_to_user_comment(user_id=user.id, review_id=review_id, db=db)


@router.get('/review/all', response_model=list[review_model.PopelarReviewCardResponseModel])
async def get_all_reviews_router(
    offset: int = None,
    limit: int = None,
    popular: bool = None,
    date: bool = None,
    db: AsyncSession = Depends(get_async_session),
):
    result = await get_all_reviews(limit=limit, offset=offset, popular=popular, date=date, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )

    return result


@router.get('/review/all/count', response_model=review_model.GetReviewCountResponseModel)
async def get_all_reviews_count_router(
    db: AsyncSession = Depends(get_async_session),
):
    result = await get_all_reviews_count(db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )

    return result[0]
