from typing import Optional

from fastapi import APIRouter, Depends
from fastapi.responses import JSONResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.game_operations import get_game, get_game_review
from games_library_api.integrations.review_operations import add_like_to_user_comment, create_review, delete_user_grade, get_user_grade
from games_library_api.models import error_model, game_model
from games_library_api.models import review_model
from games_library_api.schemas.user import User

router = APIRouter()


@router.post("/game/add_review/")
async def create_review_router(
    game_id: UUID4,
    grade: int,
    comment: Optional[str]=None,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await create_review(user_id=user.id, game_id=game_id, grade=grade, comment=comment, db=db)
    return result


@router.get('/game/get_user_rate/game_id/{game_id}', response_model=Optional[review_model.UserGameGradeResponseModel])
async def get_user_grade_router(
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await get_user_grade(user_id=user.id, game_id=game_id, db=db)
    if not result:
        return None
    return result[0]


@router.delete('/game/delete/review/{game_id}')
async def delete_user_grade_router(
    game_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    await delete_user_grade(user_id=user.id, game_id=game_id, db=db)


@router.post('/game/like/user/review/{review_id}')
async def add_like_to_user_comment_router(
    review_id: UUID4,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    print('То что мы получаем', review_id)
    await add_like_to_user_comment(user_id=user.id, review_id=review_id,  db=db)
