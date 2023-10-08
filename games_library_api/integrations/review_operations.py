import datetime
import uuid

from typing import Optional

from pydantic import UUID4
from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table, review_table, user_table


async def create_review(db: AsyncSession, game_id: UUID4, user_id: UUID4, grade: int, comment: Optional[str]):
    query = select(review_table).where(review_table.c.game_id == game_id, review_table.c.user_id == user_id)
    result = await db.execute(query)
    if result.all():
        stmt = (
        update(review_table)
        .values(
            grade=grade,
            comment=comment,
        )
        .where(review_table.c.game_id == game_id, review_table.c.user_id == user_id))
        await db.execute(stmt)
        await db.commit()
        return None
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


async def get_user_grade(db: AsyncSession, game_id: UUID4, user_id: UUID4):
    query = select(review_table).where(review_table.c.game_id == game_id, review_table.c.user_id == user_id)
    result = await db.execute(query)
    a = result.all()
    result = await db.execute(query)
    return result.all()


async def delete_user_grade(db: AsyncSession, game_id: UUID4, user_id: UUID4):
    query = select(review_table.c.game_id, review_table.c.user_id).where(review_table.c.game_id == game_id, review_table.c.user_id == user_id)
    result = await db.execute(query)
    data = result.all()
    if data:
        print(data)
        stmt = (
            delete(review_table).where(review_table.c.game_id == data[0][0], review_table.c.user_id == data[0][1])
            .where(review_table.c.game_id == game_id, review_table.c.user_id == user_id))
        await db.execute(stmt)
        await db.commit()
        return True
    return False