from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import user_table


async def get_user(username: str, db: AsyncSession) -> Any:
    query = select(user_table.c.name, user_table.c.img, user_table.c.username).where(user_table.c.username == username)
    result = await db.execute(query)
    return result.all()
