from typing import Any
from pydantic import UUID4

from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import user_table, follower_table


async def check_username_in_db(username: str, db: AsyncSession):
    query = select(user_table.c.username).where(user_table.c.username == username)
    result = await db.execute(query)
    if result.all():
        return False
    
    return True


async def get_user(username: str, db: AsyncSession) -> Any:
    query = select(
        user_table.c.name,
        user_table.c.surname,
        user_table.c.img,
        user_table.c.username,
        user_table.c.birthdate,
        user_table.c.gender,
    ).where(user_table.c.username == username)
    result = await db.execute(query)
    return result.all()


async def get_another_user(username: str, db: AsyncSession) -> Any:
    query = select(user_table.c.name, user_table.c.img, user_table.c.username).where(user_table.c.username == username)
    result = await db.execute(query)
    return result.all()


async def follow_on_user(follower_id: UUID4, user_id: UUID4, db: AsyncSession) -> Any:
    if follower_id == user_id:
        return False
    stmt = insert(follower_table).values(
        user_id=user_id,
        follower_id=follower_id)
    result = await db.execute(stmt)
    await db.commit()


