import datetime
import uuid

from sqlalchemy import insert
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table


async def add_game(
    db: AsyncSession,
    title: str,
    cover: str,
    description: str,
    slug: str,
    release: datetime.date,
    platform: list,
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
