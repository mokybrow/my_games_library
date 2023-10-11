import datetime
from operator import or_
import uuid

from pydantic import UUID4, Json
from sqlalchemy import JSON, Text, case, cast, distinct, func, insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table, review_table, user_table, review_like_table


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


async def get_all_games(db: AsyncSession, page: int):
    if page == 1:
        page_offset = 0
    else: 
        page_offset = (page-1)*36
    query = select(
        game_table.c.id,
        game_table.c.title,
        game_table.c.cover,
        game_table.c.slug,
        game_table.c.release,
    ).offset(page_offset).limit(36).order_by(game_table.c.title).filter(game_table.c.title >= 'A', game_table.c.title <= 'Z')
    result = await db.execute(query)
    return result.all()


async def get_all_games_filter(db: AsyncSession):
    query = select(
       cast((game_table.c.genre), JSON)[0]['name']
    ).where(cast(game_table.c.genre[0]['name'], Text) == 'Action').limit(10)
    print(query)
    result = await db.execute(query)
    print(result.all())
    # print(result.all())


async def get_count_games(db: AsyncSession):
    query = select(
        func.count("*")
    ).filter(game_table.c.title >= 'A', game_table.c.title <= 'Z')
    result = await db.execute(query)
    return result.all()


async def get_new_games(db: AsyncSession):
    query = select(
        game_table.c.id,
        game_table.c.title,
        game_table.c.cover,
        game_table.c.slug,
        game_table.c.release,
    ).limit(6).offset(0).filter(game_table.c.release <= datetime.date.today()).order_by(game_table.c.release.desc())
    result = await db.execute(query)
    return result.all()


async def get_game(slug: str, db: AsyncSession):
    query = select(game_table).where(game_table.c.slug == slug)
    result = await db.execute(query)
    a = result.all()
    result = await db.execute(query)

    return result.all()


async def get_game_review(game_id: UUID4, user_id: UUID4,  db: AsyncSession):

    query = select(            
            user_table.c.id,
            user_table.c.username,
            user_table.c.img,
            review_table.c.user_id,
            review_table.c.grade,
            review_table.c.comment,
            review_table.c.created_at,
            review_table.c.id.label('review_id'),
            func.count(distinct(review_like_table.c.user_id)).label('review_likes'),
            func.sum(case((review_like_table.c.user_id == user_id, 1), else_=0)).label('hasAuthorLike')).select_from(user_table).join(review_table, onclause=review_table.c.user_id==user_table.c.id, isouter=True).join(review_like_table, onclause=review_like_table.c.review_id==review_table.c.id, isouter=True).where(review_table.c.game_id == game_id).group_by(user_table.c.id, review_table.c.id)

    result = await db.execute(query)
    return result.all()



async def get_game_avg_rate(id: UUID4, db: AsyncSession):
    query = (
        select(
            func.round(func.avg(review_table.c.grade), 1).label('avg_rate')
        )
        .where(review_table.c.game_id == id)
    )
    result = await db.execute(query)
    return result.all()