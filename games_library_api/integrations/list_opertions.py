import uuid

from sqlalchemy import UUID, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas.database import list_table


async def create_list(
    db: AsyncSession,
    owner_id: UUID,
    name: str,
    cover: str,
    description: str,
    is_private: bool,
):
    stmt = insert(list_table).values(
        owner_id=owner_id,
        name=name,
        cover=cover,
        description=description,
        is_private=is_private,
    )
    await db.execute(stmt)
    await db.commit()
