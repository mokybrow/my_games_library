import uuid

from sqlalchemy import UUID, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas.database import user_table


async def get_all_users(db: AsyncSession):
    query = select(
        user_table.c.id, user_table.c.name, user_table.c.username, user_table.c.email
    )
    result = await db.execute(query)
    return result.all()
