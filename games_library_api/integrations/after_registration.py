import uuid

from fastapi import Depends
from sqlalchemy import UUID, insert
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.database import async_session_maker
from games_library_api.schemas.database import like_table, passed_table, wantplay_table


async def create_default_lists(user_id: UUID):
    async with async_session_maker() as db:
        stmt1 = insert(wantplay_table).values(id=uuid.uuid4(), user_id=user_id, cover='link/to/cover')
        stmt2 = insert(like_table).values(id=uuid.uuid4(), user_id=user_id, cover='link/to/cover')
        stmt3 = insert(passed_table).values(id=uuid.uuid4(), user_id=user_id, cover='link/to/cover')
        await db.execute(stmt1)
        await db.execute(stmt2)
        await db.execute(stmt3)
        await db.commit()

