import datetime
import re
import uuid

from operator import or_
from typing import Any, Optional

from pydantic import UUID4, Json
from sqlalchemy import JSON, Text, case, cast, delete, desc, distinct, func, insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.schemas.database import article_like_table, article_table, user_table
from backend.services.list_slug import making_slug


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
    page: int = None,
    limit: int = None,
    popular: bool = None,
    date: bool = None,
    user_id: UUID4 = None,
):
    if page == 1:
        page_offset = 0
    else:
        page_offset = (page - 1) * limit
    if limit == None:
        limit = 4
    if popular == True:
        if user_id:
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                    func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                )
                .limit(limit)
                .offset(page_offset)
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

        query = (
            select(
                article_table,
                user_table.c.username,
                user_table.c.img,
                func.count(article_like_table.c.user_id).label('like_count'),
            )
            .limit(limit)
            .offset(page_offset)
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
    if popular == False:
        if user_id:
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                    func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                )
                .limit(limit)
                .offset(page_offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by(func.count(distinct(article_like_table.c.user_id)))
            )
            result = await db.execute(query)
            result = result.all()
            return result

        query = (
            select(
                article_table,
                user_table.c.username,
                user_table.c.img,
                func.count(article_like_table.c.user_id).label('like_count'),
            )
            .limit(limit)
            .offset(page_offset)
            .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
            .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
            .group_by(article_table.c.id, user_table.c.id)
            .order_by(
                func.count(
                    distinct(article_like_table.c.user_id),
                )
            )
        )
        result = await db.execute(query)
        result = result.all()
        return result
    if date == True:
        if user_id:
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                    func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                )
                .limit(limit)
                .offset(page_offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by((article_table.c.created_at).desc())
            )
            result = await db.execute(query)
            result = result.all()
            return result

        query = (
            select(
                article_table,
                user_table.c.username,
                user_table.c.img,
                func.count(article_like_table.c.user_id).label('like_count'),
            )
            .limit(limit)
            .offset(page_offset)
            .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
            .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
            .group_by(article_table.c.id, user_table.c.id)
            .order_by((article_table.c.created_at).desc())
        )
        result = await db.execute(query)
        result = result.all()
        return result
    if date == False:
        if user_id:
            query = (
                select(
                    article_table,
                    user_table.c.username,
                    user_table.c.img,
                    func.count(article_like_table.c.user_id).label('like_count'),
                    func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
                )
                .limit(limit)
                .offset(page_offset)
                .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
                .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
                .group_by(article_table.c.id, user_table.c.id)
                .order_by((article_table.c.created_at).asc())
            )
            result = await db.execute(query)
            result = result.all()
            return result

        query = (
            select(
                article_table,
                user_table.c.username,
                user_table.c.img,
                func.count(article_like_table.c.user_id).label('like_count'),
            )
            .limit(limit)
            .offset(page_offset)
            .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
            .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
            .group_by(article_table.c.id, user_table.c.id)
            .order_by((article_table.c.created_at).asc())
        )
        result = await db.execute(query)
        result = result.all()
        return result
    if user_id:
        query = (
            select(
                article_table,
                user_table.c.username,
                user_table.c.img,
                func.count(article_like_table.c.user_id).label('like_count'),
                func.sum(case((article_like_table.c.user_id == user_id, 1), else_=0)),
            )
            .limit(limit)
            .offset(page_offset)
            .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
            .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
            .group_by(article_table.c.id, user_table.c.id)
            .order_by(func.count(distinct(article_like_table.c.user_id)))
        )
        result = await db.execute(query)
        result = result.all()
        return result
    query = (
        select(
            article_table,
            user_table.c.username,
            user_table.c.img,
            func.count(article_like_table.c.user_id).label('like_count'),
        )
        .limit(limit)
        .offset(page_offset)
        .join(article_like_table, onclause=article_like_table.c.article_id == article_table.c.id, isouter=True)
        .join(user_table, onclause=article_table.c.user_id == user_table.c.id, isouter=True)
        .group_by(article_table.c.id, user_table.c.id)
        .order_by(func.count(distinct(article_like_table.c.user_id)))
    )
    result = await db.execute(query)
    result = result.all()
    return result


async def get_all_article_count(db: AsyncSession) -> Any:
    query = select(func.count("*")).select_from(article_table)
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
