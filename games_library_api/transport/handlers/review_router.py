from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.game_operations import get_game, get_game_review
from games_library_api.integrations.review_operations import create_review
from games_library_api.models import game_model
from games_library_api.schemas.user import User

router = APIRouter()


@router.post("/game/add_review/")
async def create_review_router(
    game_id: UUID4,
    grade: int,
    comment: str = None,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    if user.is_verified:
        result = await create_review(user_id=user.id, game_id=game_id, grade=grade, comment=comment, db=db)
        return result
