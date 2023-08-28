import uuid

from sqlalchemy import UUID, func, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from ..schemas.database import list_table, user_table


async def create_list(
    db: AsyncSession,
    owner_id: UUID,
    name: str,
    cover: str,
    description: str,
    is_private: bool,
):
    stmt = insert(list_table).values(
        id=uuid.uuid4(),
        owner_id=owner_id,
        name=name,
        cover=cover,
        description=description,
        is_private=is_private,
    )
    await db.execute(stmt)
    await db.commit()


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
