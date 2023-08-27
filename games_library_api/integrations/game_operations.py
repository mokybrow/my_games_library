import uuid

from sqlalchemy import UUID, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas.database import game_table


async def add_game(db: AsyncSession, title: str, cover: str, description: str):
    stmt = insert(game_table).values(
        id=uuid.uuid4(), title=title, cover=cover, description=description
    )
    await db.execute(stmt)
    await db.commit()
    pass
