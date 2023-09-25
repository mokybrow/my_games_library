import datetime
import uuid

from typing import Optional

from pydantic import UUID4
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table, review_table, user_table


async def create_review(db: AsyncSession, game_id: UUID4, user_id: UUID4, grade: int, comment: Optional[str]):
    stmt = insert(review_table).values(
        id=uuid.uuid4(),
        user_id=user_id,
        game_id=game_id,
        grade=grade,
        comment=comment,
        created_at=datetime.datetime.utcnow(),
    )
    await db.execute(stmt)
    await db.commit()
