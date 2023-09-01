import datetime
import uuid

from pydantic import Json
from sqlalchemy import insert
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas.database import game_table


async def add_game(
    db: AsyncSession,
    title: str,
    cover: str,
    description: str,
    slug: str,
    release: datetime.date,
    platform: Json,
):
    stmt = insert(game_table).values(
        id=uuid.uuid4(),
        title=title,
        cover=cover,
        description=description,
        slug=slug,
        release=release,
        platform=platform,
    )
    await db.execute(stmt)
    await db.commit()
    pass
