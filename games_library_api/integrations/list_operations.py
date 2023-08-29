import datetime
import uuid

from pydantic import UUID4
from sqlalchemy import UUID, func, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.services.list_slug import making_slug

from ..schemas.database import (game_table, like_game_table, like_table,
                                list_game_table, list_table, passed_game_table,
                                passed_table, user_table, wantplay_game_table,
                                wantplay_table)


async def create_list(
    db: AsyncSession,
    owner_id: UUID,
    name: str,
    cover: str,
    description: str,
    is_private: bool,
):
    query = select(list_table.c.name).filter(
        list_table.c.slug == name.strip().replace(" ", "_")
    )
    result = await db.execute(query)
    if result.all():
        return False
    stmt = insert(list_table).values(
        id=uuid.uuid4(),
        owner_id=owner_id,
        name=name,
        slug=await making_slug(name),
        cover=cover,
        description=description,
        is_private=is_private,
    )
    await db.execute(stmt)
    await db.commit()
    return True


async def get_list(db: AsyncSession):
    query = select(list_table.c.name).where(list_table.c.is_private == False)
    result = await db.execute(query)
    print(result.all())


async def get_user_list(db: AsyncSession, user_id: UUID):
    query = select(
        list_table.c.name,
        list_table.c.cover,
        list_table.c.description,
    ).where(list_table.c.owner_id == user_id)
    result = await db.execute(query)

    return result.all()


async def add_game_to_user_list(list_id: UUID4, game_id: UUID4, db: AsyncSession):
    stmt = insert(list_game_table).values(
        list_id=list_id,
        game_id=game_id,
        created_at=datetime.datetime.utcnow(),
    )
    result = await db.execute(stmt)
    await db.commit()
    if not result:
        return False
    return True


async def add_game_to_passed_list(list_id: UUID4, game_id: UUID4, db: AsyncSession):
    stmt = insert(passed_game_table).values(
        list_id=list_id,
        game_id=game_id,
        created_at=datetime.datetime.utcnow(),
    )
    result = await db.execute(stmt)
    await db.commit()
    if not result:
        return False
    return True


async def add_game_to_liked_list(list_id: UUID4, game_id: UUID4, db: AsyncSession):
    stmt = insert(like_game_table).values(
        list_id=list_id,
        game_id=game_id,
        created_at=datetime.datetime.utcnow(),
    )
    result = await db.execute(stmt)
    await db.commit()

    if not result:
        return False
    return True


async def add_game_to_wantplay_list(list_id: UUID4, game_id: UUID4, db: AsyncSession):
    stmt = insert(wantplay_game_table).values(
        list_id=list_id,
        game_id=game_id,
        created_at=datetime.datetime.utcnow(),
    )
    result = await db.execute(stmt)
    await db.commit()
    if not result:
        return False
    return True


async def get_wantplay_game(db: AsyncSession, user_id: UUID):
    query = (
        select(game_table.c.title, game_table.c.cover, game_table.c.slug)
        .join(wantplay_table)
        .filter(wantplay_table.c.user_id == user_id)
        .join(game_table)
        .filter(game_table.c.id == wantplay_game_table.c.game_id)
    )
    result = await db.execute(query)
    return result.all()


async def get_liked_game(db: AsyncSession, user_id: UUID):
    query = (
        select(game_table.c.title, game_table.c.cover, game_table.c.slug)
        .join(like_table)
        .filter(like_table.c.user_id == user_id)
        .join(game_table)
        .filter(game_table.c.id == like_game_table.c.game_id)
    )
    result = await db.execute(query)
    return result.all()


async def get_passed_game(db: AsyncSession, user_id: UUID):
    query = (
        select(game_table.c.title, game_table.c.cover, game_table.c.slug)
        .join(passed_table)
        .filter(passed_table.c.user_id == user_id)
        .join(game_table)
        .filter(game_table.c.id == passed_game_table.c.game_id)
    )
    result = await db.execute(query)
    return result.all()
