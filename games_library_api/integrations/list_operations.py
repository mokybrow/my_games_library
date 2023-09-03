import datetime
import uuid

from typing import Any

from pydantic import UUID4
from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import (
    game_table,
    like_game_table,
    like_table,
    list_game_table,
    list_table,
    passed_game_table,
    passed_table,
    wantplay_game_table,
    wantplay_table,
)
from games_library_api.services.list_slug import making_slug


async def create_list(
    db: AsyncSession,
    owner_id: UUID4,
    name: str,
    cover: str,
    description: str,
    is_private: bool,
) -> bool:
    query = select(list_table.c.name).filter(list_table.c.slug == await making_slug(name))
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


async def get_list(db: AsyncSession) -> Any:
    query = select(list_table.c.name, list_table.c.cover).filter(list_table.c.is_private == False)
    result = await db.execute(query)
    return result.all()


async def get_user_list(db: AsyncSession, user_id: UUID4) -> Any:
    query = select(
        list_table.c.name,
        list_table.c.cover,
        list_table.c.description,
    ).where(list_table.c.owner_id == user_id)
    result = await db.execute(query)

    return result.all()


async def add_game_to_user_list(list_id: UUID4, game_id: UUID4, db: AsyncSession) -> bool:
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


async def add_game_to_passed_list(list_id: UUID4, game_id: UUID4, db: AsyncSession) -> bool:
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


async def add_game_to_liked_list(list_id: UUID4, game_id: UUID4, db: AsyncSession) -> bool:
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


async def add_game_to_wantplay_list(list_id: UUID4, game_id: UUID4, db: AsyncSession) -> bool:
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


async def get_wantplay_game(db: AsyncSession, user_id: UUID4) -> Any:
    query = (
        select(game_table.c.title, game_table.c.cover, game_table.c.slug)
        .join(wantplay_table)
        .filter(wantplay_table.c.user_id == user_id)
        .join(game_table)
        .filter(game_table.c.id == wantplay_game_table.c.game_id)
    )
    result = await db.execute(query)
    return result.all()


async def get_liked_game(db: AsyncSession, user_id: UUID4) -> Any:
    query = (
        select(game_table.c.title, game_table.c.cover, game_table.c.slug)
        .join(like_table)
        .filter(like_table.c.user_id == user_id)
        .join(game_table)
        .filter(game_table.c.id == like_game_table.c.game_id)
    )
    result = await db.execute(query)
    return result.all()


async def get_passed_game(db: AsyncSession, user_id: UUID4) -> Any:
    query = (
        select(game_table.c.title, game_table.c.cover, game_table.c.slug)
        .join(passed_table)
        .filter(passed_table.c.user_id == user_id)
        .join(game_table)
        .filter(game_table.c.id == passed_game_table.c.game_id)
    )
    result = await db.execute(query)
    return result.all()


async def delete_user_list(db: AsyncSession, list_id: UUID4) -> None:
    stmt = delete(list_table).where(list_table.c.id == list_id)
    await db.execute(stmt)
    await db.commit()


async def update_list(
    list_id: UUID4,
    db: AsyncSession,
    name: str,
    cover: str,
    description: str,
    is_private: bool,
) -> bool:
    query = select(list_table).filter(list_table.c.slug == await making_slug(name))
    result = await db.execute(query)
    if result.all():
        return False

    stmt = (
        update(list_table)
        .values(
            name=name,
            slug=await making_slug(name),
            cover=cover,
            description=description,
            is_private=is_private,
        )
        .where(list_table.c.id == list_id)
    )
    result = await db.execute(stmt)
    await db.commit()
    return True
