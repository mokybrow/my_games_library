import datetime
import uuid

from operator import or_
from typing import Any

from pydantic import UUID4, Json
from sqlalchemy import JSON, Text, case, cast, desc, distinct, func, insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table, review_like_table, review_table, user_table


async def add_game(
    db: AsyncSession,
    title: str,
    cover: str,
    description: str,
    slug: str,
    release: datetime.date,
    platform: Json,
    genre: Json,
):
    stmt = insert(game_table).values(
        id=uuid.uuid4(),
        title=title,
        cover=cover,
        description=description,
        slug=slug,
        release=release,
        platform=platform,
        genre=genre,
    )
    await db.execute(stmt)
    await db.commit()
    pass


async def get_all_games(db: AsyncSession, page: int, limit: int = None, sort: str = None, decade: str = None, genre: str = None):
    if page == 1:
        page_offset = 0
    else:
        page_offset = (page - 1) * limit
    if (sort == None and genre == None):
        query = (select(
                        game_table.c.id,
                        game_table.c.title,
                        game_table.c.cover,
                        game_table.c.slug,
                        game_table.c.release,
                    )
                    .offset(page_offset)
                    .limit(limit)
                    .order_by(game_table.c.title)
                    .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None)
                )
        result = await db.execute(query)
        return result.all()
    if (sort != None and genre == None):
        if sort == 'old':
            query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.release.asc())
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None)
                    )
            result = await db.execute(query)
            return result.all()
        if sort == 'new':
            query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.release.desc())
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None)
                    )
            result = await db.execute(query)
            return result.all()
        if sort == 'alphabetically-asc':
            query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.title.asc())
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None)
                    )
            result = await db.execute(query)
            return result.all()
        if sort == 'alphabetically-desc':
            query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.title.desc())
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None)
                    )
            result = await db.execute(query)
            return result.all()
        
    if (sort == None and genre != None):
        query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.title)
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None, game_table.c.genre.any(genre))
                    )
        result = await db.execute(query)
        return result.all()
    
    if (sort != None and genre != None):
        if sort == 'old':
            query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.release.asc())
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None, game_table.c.release != None, game_table.c.genre.any(genre))
                    )
            result = await db.execute(query)
            return result.all()
        if sort == 'new':
            query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.release.desc())
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None, game_table.c.release != None, game_table.c.genre.any(genre))
                    )
            result = await db.execute(query)
            return result.all()
        if sort == 'alphabetically-asc':
            query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.title.asc())
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None, game_table.c.genre.any(genre))
                    )
            result = await db.execute(query)
            return result.all()
        if sort == 'alphabetically-desc':
            query = (select(
                            game_table.c.id,
                            game_table.c.title,
                            game_table.c.cover,
                            game_table.c.slug,
                            game_table.c.release,
                        )
                        .offset(page_offset)
                        .limit(limit)
                        .order_by(game_table.c.title.desc())
                        .filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None, game_table.c.genre.any(genre))
                    )
            result = await db.execute(query)
            return result.all()
        
async def get_count_games(db: AsyncSession, decade: str = None, genre: str = None):
    if genre != None:
        query = select(func.count("*")).where(game_table.c.genre.any(genre), game_table.c.esrb_rating != None)
        result = await db.execute(query)
        return result.all()

    query = select(func.count("*")).filter(game_table.c.title >= 'A', game_table.c.title <= 'Z', game_table.c.esrb_rating != None)
    result = await db.execute(query)
    return result.all()


async def get_new_games(db: AsyncSession):
    query = (
        select(
            game_table.c.id,
            game_table.c.title,
            game_table.c.cover,
            game_table.c.slug,
            game_table.c.release,
        )
        .limit(6)
        .offset(0)
        .filter(game_table.c.release >= datetime.date.today(), game_table.c.release <= datetime.date.today() + datetime.timedelta(days=20))
        .order_by(game_table.c.release.desc())
    )
    result = await db.execute(query)
    return result.all()


async def get_game_profile(slug: str, db: AsyncSession):
    query = select(game_table,
                   func.round(func.avg(review_table.c.grade), 1).label('avg_rate')).join(review_table, onclause=review_table.c.game_id==game_table.c.id, isouter=True).where(game_table.c.slug == slug).group_by(game_table.c.id)
    result = await db.execute(query)
    result = result.all()
    if not result:
        return False
    return result


async def get_game_review(game_id: UUID4, user_id: UUID4, db: AsyncSession):
    query = (
        select(
            user_table.c.id,
            user_table.c.username,
            user_table.c.img,
            review_table.c.user_id,
            review_table.c.grade,
            review_table.c.comment,
            review_table.c.created_at,
            review_table.c.id.label('review_id'),
            func.count(distinct(review_like_table.c.user_id)).label('review_likes'),
            func.sum(case((review_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike'),
        )
        .select_from(user_table)
        .join(review_table, onclause=review_table.c.user_id == user_table.c.id, isouter=True)
        .join(review_like_table, onclause=review_like_table.c.review_id == review_table.c.id, isouter=True)
        .where(review_table.c.game_id == game_id, review_table.c.comment != None)
        .group_by(user_table.c.id, review_table.c.id)
        .limit(10)
    )

    result = await db.execute(query)
    return result.all()


async def get_game_review_for_all(game_id: UUID4, db: AsyncSession):
    query = (
        select(
            user_table.c.id,
            user_table.c.username,
            user_table.c.img,
            review_table.c.user_id,
            review_table.c.grade,
            review_table.c.comment,
            review_table.c.created_at,
            review_table.c.id.label('review_id'),
            func.count(distinct(review_like_table.c.user_id)).label('review_likes'),
        )
        .select_from(user_table)
        .join(review_table, onclause=review_table.c.user_id == user_table.c.id, isouter=True)
        .join(review_like_table, onclause=review_like_table.c.review_id == review_table.c.id, isouter=True)
        .where(review_table.c.game_id == game_id)
        .group_by(user_table.c.id, review_table.c.id)
    )

    result = await db.execute(query)
    return result.all()




