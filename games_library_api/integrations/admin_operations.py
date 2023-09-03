from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import user_table


async def get_all_users(db: AsyncSession) -> Any:
    query = select(user_table.c.id, user_table.c.name, user_table.c.username, user_table.c.email)
    result = await db.execute(query)
    return result.all()
