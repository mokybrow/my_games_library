import datetime
import uuid

from pydantic import UUID4, Json
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table, review_table, user_table


async def add_game(
    db: AsyncSession,
    title: str,
    cover: str,
    description: str,
    slug: str,
    release: datetime.date,
    platform: Json,
    genre: Json,
):
    stmt = insert(game_table).values(
        id=uuid.uuid4(),
        title=title,
        cover=cover,
        description=description,
        slug=slug,
        release=release,
        platform=platform,
        genre=genre,
    )
    await db.execute(stmt)
    await db.commit()
    pass


async def gef_all_games(db: AsyncSession):
    query = select(
        game_table.c.id,
        game_table.c.title,
        game_table.c.cover,
        game_table.c.slug,
    )
    result = await db.execute(query)
    return result.all()


async def get_game(id: UUID4, db: AsyncSession):
    query = select(game_table).where(game_table.c.id == id)

    result = await db.execute(query)
    return result.all()


async def get_game_review(id: UUID4, db: AsyncSession):
    query = (
        select(
            review_table.c.user_id,
            review_table.c.grade,
            review_table.c.comment,
            review_table.c.created_at,
            user_table.c.id,
            user_table.c.username,
            user_table.c.img,
        )
        .where(review_table.c.game_id == id)
        .join(user_table)
    )
    result = await db.execute(query)
    return result.all()
