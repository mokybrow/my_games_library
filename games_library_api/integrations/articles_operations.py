import datetime
import re
import uuid

from operator import or_
from typing import Any, Optional

from pydantic import UUID4, Json
from sqlalchemy import JSON, Text, case, cast, delete, desc, distinct, func, insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import article_like_table, article_table, user_table
from games_library_api.services.list_slug import making_slug


async def create_article(db: AsyncSession, title: str, cover: Optional[str], text: str, tags: str, user_id: UUID4):
    tags = tags.replace(' ', '').split(",")

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
        created_at=datetime.datetime.utcnow(),
    )
    await db.execute(stmt)
    await db.commit()
    return True


async def get_all_article(
    db: AsyncSession,
    offset: int = None,
    limit: int = None,
    sort: str = None, 
    tag: str = None, 
    user_id: UUID4 = None,
):
    if limit == None:
        limit = 4
    if user_id:
        if not tag:
            if sort == 'popular-desc':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(
                        func.count(
                            distinct(article_like_table.c.user_id),
                        ).desc()
                    )
                )
                result = await db.execute(query)
                result = result.all()
                return result
            
            if sort == 'popular-asc':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(
                        func.count(
                            distinct(article_like_table.c.user_id),
                        ).asc()
                    )
                )
                result = await db.execute(query)
                result = result.all()
                return result
            
            if sort == 'old':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(article_table.c.created_at.asc()
                    )
                )
                result = await db.execute(query)
                result = result.all()
                return result
            if sort == 'new':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(article_table.c.created_at.desc())
                )
                result = await db.execute(query)
                result = result.all()
                return result

            if sort == 'alphabetically-asc':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(article_table.c.title.asc()
                    )
                )
                result = await db.execute(query)
                result = result.all()
                return result
            if sort == 'alphabetically-desc':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(article_table.c.title.desc()
                    )
                )
                result = await db.execute(query)
                result = result.all()
                return result
        if tag:
            if sort == 'popular-desc':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(
                        func.count(
                            distinct(article_like_table.c.user_id),
                        ).desc()
                    ).filter(article_table.c.tags.any(tag))
                )
                result = await db.execute(query)
                result = result.all()
                return result
            
            if sort == 'popular-asc':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(
                        func.count(
                            distinct(article_like_table.c.user_id),
                        ).asc()
                    ).filter(article_table.c.tags.any(tag))
                )
                result = await db.execute(query)
                result = result.all()
                return result
            
            if sort == 'old':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(article_table.c.created_at.asc()
                    ).filter(article_table.c.tags.any(tag))
                )
                result = await db.execute(query)
                result = result.all()
                return result
            if sort == 'new':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(article_table.c.created_at.desc()).filter(article_table.c.tags.any(tag))
                )
                result = await db.execute(query)
                result = result.all()
                return result

            if sort == 'alphabetically-asc':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(article_table.c.title.asc()
                    ).filter(article_table.c.tags.any(tag))
                )
                result = await db.execute(query)
                result = result.all()
                return result
            if sort == 'alphabetically-desc':
                query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                    .limit(limit)
                    .offset(offset)
                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .group_by(article_table.c.id, user_table.c.id)
                    .order_by(article_table.c.title.desc()
                    ).filter(article_table.c.tags.any(tag))
                )
                result = await db.execute(query)
                result = result.all()
                return result
    if not tag:
        if sort == 'popular-desc':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(
                    func.count(
                        distinct(article_like_table.c.user_id),
                    ).desc()
                )
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'popular-asc':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(
                    func.count(
                        distinct(article_like_table.c.user_id),
                    ).asc()
                )
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'old':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(article_table.c.created_at.asc()
                )
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'new':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(article_table.c.created_at.desc()
                )
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'alphabetically-desc':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(article_table.c.title.desc()
                )
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'alphabetically-asc':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(article_table.c.created_at.asc()
                )
            )
            result = await db.execute(query)
            result = result.all()
            return result
    if tag:
        if sort == 'popular-desc':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(
                    func.count(
                        distinct(article_like_table.c.user_id),
                    ).desc()
                ).filter(article_table.c.tags.any(tag))
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'popular-asc':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(
                    func.count(
                        distinct(article_like_table.c.user_id),
                    ).asc()
                ).filter(article_table.c.tags.any(tag))
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'old':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(article_table.c.created_at.asc()
                ).filter(article_table.c.tags.any(tag))
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'new':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(article_table.c.created_at.desc()
                ).filter(article_table.c.tags.any(tag))
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'alphabetically-desc':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(article_table.c.title.desc()
                ).filter(article_table.c.tags.any(tag))
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if sort == 'alphabetically-asc':
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(article_table.c.created_at.asc()
                ).filter(article_table.c.tags.any(tag))
            )
            result = await db.execute(query)
            result = result.all()
            return result
        if not sort:
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .filter(article_table.c.tags.any(tag))
            )
            result = await db.execute(query)
            result = result.all()
            return result
    if tag == None:
        query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .order_by(article_table.c.created_at.desc())
                .group_by(article_table.c.id, user_table.c.id)
            )
        result = await db.execute(query)
        result = result.all()
        return result
    if tag:
        query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                )
                .limit(limit)
                .offset(offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .order_by(article_table.c.created_at.desc())
                .group_by(article_table.c.id, user_table.c.id)
                .filter(article_table.c.tags.any(tag))
            )
        result = await db.execute(query)
        result = result.all()
        return result


async def get_article(    
        db: AsyncSession,
          slug: str,
        user_id: UUID4 = None,
      ):
    if user_id:
        query = (
                    select(
                        article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                        func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                    )
                                    .group_by(article_table.c.id, user_table.c.id)

                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    .where(article_table.c.slug == slug)
                )
        result = await db.execute(query)
        result = result.all()
        return result
    query = (select(article_table,
                        user_table.c.username,
                        user_table.c.img,
                        func.count(article_like_table.c.user_id).label('like_count'),
                    )
                    .where(article_table.c.slug == slug)
                                    .group_by(article_table.c.id, user_table.c.id)

                    .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                    .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                    
                )
    result = await db.execute(query)
    result = result.all()
    return result
    


async def get_all_article_count(    
        db: AsyncSession,
        tag: str = None) -> Any:
    if not tag:
        query = select(func.count("*")).select_from(article_table)
        result = await db.execute(query)
        result = result.all()
        return result
    if tag:
        query = select(func.count("*")).select_from(article_table).filter(article_table.c.tags.any(tag))
        result = await db.execute(query)
        result = result.all()
        return result


async def like_article(article_id: UUID4, user_id: UUID4, db: AsyncSession) -> Any:
    query = select(article_like_table).where(
        article_like_table.c.article_id == article_id, article_like_table.c.user_id == user_id
    )
    result = await db.execute(query)
    if result.all():
        stmt = delete(article_like_table).where(
            article_like_table.c.article_id == article_id, article_like_table.c.user_id == user_id
        )
        await db.execute(stmt)
        await db.commit()
        return True
    stmt = insert(article_like_table).values(
        article_id=article_id,
        user_id=user_id,
        created_at=datetime.datetime.utcnow(),
    )
    await db.execute(stmt)
    await db.commit()
    return True
