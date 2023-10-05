from typing import Any
import uuid
from pydantic import UUID4

from sqlalchemy import distinct, func, insert, select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import user_table, follower_table,list_table,passed_table,passed_game_table,list_game_table,game_table


async def get_user(id: UUID4, db: AsyncSession) -> dict:
    query = select(user_table, func.count(distinct(list_table.c.id)).label('list_count'), func.count(distinct(follower_table.c.follower_id)).label('follower_count'), func.count(distinct(passed_game_table.c.game_id)).label('passed_game_count')).join( follower_table, onclause=follower_table.c.user_id==user_table.c.id, isouter=True).join(list_table, onclause=list_table.c.owner_id==user_table.c.id, isouter=True).join(passed_table, onclause=passed_table.c.user_id==user_table.c.id, isouter=True).join(passed_game_table, onclause=passed_game_table.c.list_id==passed_table.c.id, isouter=True).group_by(user_table).where(user_table.c.id == id)
    result = await db.execute(query)
    return result.all()


async def get_another_user(username: str, db: AsyncSession) -> dict:
    query = select(        
        user_table.c.id, 
        user_table.c.name, 
        user_table.c.surname, 
        user_table.c.img, 
        user_table.c.username, 
        func.count(distinct(list_table.c.id)).label('list_count'), 
        func.count(distinct(follower_table.c.follower_id)).label('follower_count'), 
        func.count(distinct(passed_game_table.c.game_id)).label('passed_game_count')).join(follower_table, onclause=follower_table.c.user_id==user_table.c.id, isouter=True).join(list_table, onclause=list_table.c.owner_id==user_table.c.id, isouter=True).join(passed_table, onclause=passed_table.c.user_id==user_table.c.id, isouter=True).join(passed_game_table, onclause=passed_game_table.c.list_id==passed_table.c.id, isouter=True).group_by(user_table).where(user_table.c.username == username)

    result = await db.execute(query)
    return result.all()

async def get_user_by_email(email: str, db: AsyncSession) -> dict:
    query = select(
        user_table
    ).where(user_table.c.email == email)
    result = await db.execute(query)
    return result.all()


async def get_user_by_username(username: str, db: AsyncSession) -> dict:
    query = select(
        user_table
    ).where(user_table.c.username == username)
    result = await db.execute(query)
    return result.all()


async def follow_on_user(follower_id: UUID4, user_id: UUID4, db: AsyncSession) -> Any:
    if str(follower_id) == str(user_id):
        return False
    query = select(follower_table).where(follower_table.c.user_id == user_id, follower_table.c.follower_id == follower_id)
    result = await db.execute(query)
    if result.all():
        return False
    stmt = insert(follower_table).values(
        user_id=user_id,
        follower_id=follower_id)
    result = await db.execute(stmt)
    await db.commit()
    return True

async def unfollow(follower_id: UUID4, user_id: UUID4, db: AsyncSession) -> None:
    query = select(follower_table).where(follower_table.c.user_id == user_id, follower_table.c.follower_id == follower_id)
    result = await db.execute(query)
    if result:
        stmt = delete(follower_table).where(follower_table.c.user_id == user_id, follower_table.c.follower_id == follower_id)
        result = await db.execute(stmt)
    await db.commit()


async def check_follow(follower_id: UUID4, user_id: UUID4, db: AsyncSession) -> None:
    query = select(follower_table).where(follower_table.c.user_id == user_id, follower_table.c.follower_id == follower_id)
    result = await db.execute(query)
    if not result.all():
        return False
    return True


async def get_user_last_game(user_id: UUID4, db: AsyncSession) -> None:
    query = select(         
        game_table.c.id,
        game_table.c.title,
        game_table.c.cover,
        game_table.c.slug,
        game_table.c.release,).where(passed_table.c.user_id == user_id).join(passed_game_table, onclause=passed_table.c.id==passed_game_table.c.list_id).join(game_table, onclause=passed_game_table.c.game_id==game_table.c.id)
    result = await db.execute(query)
    return result.all()