import datetime
import re
import uuid

from operator import or_
from typing import Any, Optional

from pydantic import UUID4, Json
from sqlalchemy import JSON, Text, case, cast, desc, distinct, func, insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import article_table, user_table, article_like_table
from games_library_api.services.list_slug import making_slug


async def create_article(db: AsyncSession, title: str, cover: Optional[str] ,  text: str, tags:str, user_id: UUID4):
    print(tags)
    tags = tags.split()
    print(tags)
    query = select(article_table.c.title).filter(article_table.c.slug == await making_slug(title))
    result = await db.execute(query)
    if result.all():
        return False
    stmt = insert(article_table).values(
        id=uuid.uuid4(),
        user_id=user_id,
        title=title,
        cover=cover,
        text=text,
        slug=await making_slug(title),
        publishing=False,
        tags=tags,
        created_at=datetime.datetime.utcnow()
    )
    await db.execute(stmt)
    await db.commit()
    return True

async def get_all_article(
    db: AsyncSession, 
    offset: int = None,
    limit: int = None,
    popular: bool = None,
    date: bool = None,):
    if limit == None:
        limit = 4
    
    if popular == True:
        query = select(article_table,
                    user_table.c.username, user_table.c.img, 
                    func.count(article_like_table.c.user_id).label('like_count')).limit(limit).offset(offset).join(article_like_table, onclause=article_like_table.c.article_id==article_table.c.id, isouter=True).join(user_table, onclause=article_table.c.user_id==user_table.c.id, isouter=True).group_by(article_table.c.id, user_table.c.id).order_by(func.count(distinct(article_like_table.c.user_id), ).desc())
        result = await db.execute(query)
        result = result.all()
        return result
    
    query = select(article_table,
                    user_table.c.username, user_table.c.img, 
                    func.count(article_like_table.c.user_id).label('like_count')).limit(limit).offset(offset).join(article_like_table, onclause=article_like_table.c.article_id==article_table.c.id, isouter=True).join(user_table, onclause=article_table.c.user_id==user_table.c.id, isouter=True).group_by(article_table.c.id, user_table.c.id).order_by(func.count(distinct(article_like_table.c.user_id)))
    result = await db.execute(query)
    result = result.all()
    return result


async def get_all_article_count(db: AsyncSession) -> Any:
    query = select(func.count("*")).select_from(article_table)
    result = await db.execute(query)
    result = result.all()
    return result
