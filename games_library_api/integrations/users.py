from sqlalchemy import insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession
from ..schemas.user import user_table

async def get_all_users(db:AsyncSession):
    query = select(user_table)