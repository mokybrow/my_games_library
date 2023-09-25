import datetime
import uuid

from typing import Any

from pydantic import UUID4
from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.models.list_model import CreateListModel
from games_library_api.schemas.database import (
    game_table,
    like_game_table,
    like_table,
    list_game_table,
    list_table,
    passed_game_table,
    passed_table,
    user_table,
    wantplay_game_table,
    wantplay_table,
)
from games_library_api.services.list_slug import making_slug


async def create_list(
    db: AsyncSession,
    owner_id: UUID4,
    new_list: CreateListModel,
) -> bool:
    query = select(list_table.c.name).filter(list_table.c.slug == await making_slug(new_list.name))
    result = await db.execute(query)
    if result.all():
        return False
    stmt = insert(list_table).values(
        id=uuid.uuid4(),
        owner_id=owner_id,
        name=new_list.name,
        slug=await making_slug(new_list.name),
        description=new_list.description,
        is_private=new_list.is_private,
    )
    await db.execute(stmt)
    await db.commit()
    return True


async def add_cover_to_list(
    db: AsyncSession,
    cover: str,
    list_id: str,
):
    stmt = (
        update(list_table)
        .where(list_table.c.id == list_id)
        .values(
            cover=cover,
        )
    )
    await db.execute(stmt)
    await db.commit()
    return True


async def get_list(db: AsyncSession) -> Any:
    query = select(list_table.c.name, list_table.c.cover).filter(list_table.c.is_private == False)
    result = await db.execute(query)
    return result.all()


async def get_user_list(db: AsyncSession, username: str) -> Any:
    query = select(
        user_table.c.username,
        list_table.c.name,
        list_table.c.cover,
        list_table.c.description,
    ).where(user_table.c.username == username)
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


async def get_wantplay_game(db: AsyncSession, username: str) -> Any:
    query = (
        select(user_table.c.username, game_table.c.title, game_table.c.slug, game_table.c.cover)
        .where(user_table.c.username == username)
        .join(wantplay_table)
        .join(wantplay_game_table)
        .join(game_table)
    )
    result = await db.execute(query)
    return result.all()


async def get_passed_game(db: AsyncSession, username: str) -> Any:
    query = (
        select(user_table.c.username, game_table.c.title, game_table.c.slug, game_table.c.cover)
        .where(user_table.c.username == username)
        .join(passed_table)
        .join(passed_game_table)
        .join(game_table)
    )
    result = await db.execute(query)
    return result.all()


async def get_liked_game(db: AsyncSession, username: str) -> Any:
    query = (
        select(user_table.c.username, game_table.c.title, game_table.c.slug, game_table.c.cover)
        .where(user_table.c.username == username)
        .join(like_table)
        .join(like_game_table)
        .join(game_table)
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
    new_list: CreateListModel,
) -> bool:
    query = select(list_table).filter(list_table.c.slug == await making_slug(new_list.name))
    result = await db.execute(query)
    if result.all():
        return False

    stmt = (
        update(list_table)
        .values(
            name=new_list.name,
            slug=await making_slug(new_list.name),
            description=new_list.description,
            is_private=new_list.is_private,
        )
        .where(list_table.c.id == list_id)
    )
    result = await db.execute(stmt)
    await db.commit()
    return True
