import datetime
import uuid

from typing import Optional

from pydantic import UUID4
from sqlalchemy import delete, distinct, func, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table, review_like_table, review_table, user_table


async def create_review(db: AsyncSession, game_id: UUID4, user_id: UUID4, grade: int, comment: Optional[str]):
    query = select(review_table).where(review_table.c.game_id == game_id, review_table.c.user_id == user_id)
    result = await db.execute(query)
    check_on_review = result.all()
    print(comment)
    if comment == None:
        comment = None
    if check_on_review:
        stmt = (
            update(review_table)
            .values(
                grade=grade,
                comment=comment,
            )
            .where(review_table.c.game_id == game_id, review_table.c.user_id == user_id)
        )
        await db.execute(stmt)
        await db.commit()
        return None
    stmt = insert(review_table).values(
        id=uuid.uuid4(),
        user_id=user_id,
        game_id=game_id,
        grade=grade,
        comment=comment,
        created_at=datetime.datetime.utcnow(),
    )
    await db.execute(stmt)
    await db.commit()
    return None


async def get_user_grade(db: AsyncSession, game_id: UUID4, user_id: UUID4):
    query = select(review_table).where(review_table.c.game_id == game_id, review_table.c.user_id == user_id)
    result = await db.execute(query)
    result = result.all()
    return result


async def delete_user_grade(db: AsyncSession, game_id: UUID4, user_id: UUID4):
    query = select(review_table.c.game_id, review_table.c.user_id).where(
        review_table.c.game_id == game_id, review_table.c.user_id == user_id
    )
    result = await db.execute(query)
    data = result.all()
    if data:
        print(data)
        stmt = (
            delete(review_table)
            .where(review_table.c.game_id == data[0][0], review_table.c.user_id == data[0][1])
            .where(review_table.c.game_id == game_id, review_table.c.user_id == user_id)
        )
        await db.execute(stmt)
        await db.commit()
        return True
    return False


async def add_like_to_user_comment(db: AsyncSession, review_id: UUID4, user_id: UUID4):
    query = select(review_like_table).where(
        review_like_table.c.review_id == review_id, review_like_table.c.user_id == user_id
    )
    result = await db.execute(query)
    if result.all():
        stmt = delete(review_like_table).where(
            review_like_table.c.review_id == review_id, review_like_table.c.user_id == user_id
        )
        await db.execute(stmt)
        await db.commit()
        return False
    stmt = insert(review_like_table).values(
        review_id=review_id,
        user_id=user_id,
        created_at=datetime.datetime.utcnow(),
    )
    await db.execute(stmt)
    await db.commit()
    return True




async def get_reviews(limit: int| None, offset: int | None, popular: bool | None, db: AsyncSession):
    if limit == None:
        limit = 4
    
    date2 = datetime.datetime.utcnow() + datetime.timedelta(days=-7)
    print(popular)
    if popular == True:
        query = select(review_table.c.id, review_table.c.grade, review_table.c.comment, review_table.c.created_at,
                    user_table.c.id.label('user_id'), user_table.c.username, user_table.c.img, 
                    game_table.c.id.label('game_id'), game_table.c.title, game_table.c.cover, game_table.c.slug, 
                    func.count(review_like_table.c.user_id).label('like_count')).limit(limit).offset(offset).where(review_table.c.comment != None, review_table.c.created_at <=datetime.datetime.utcnow(), review_table.c.created_at >=(datetime.datetime.utcnow() - datetime.timedelta(days=7))).join(review_like_table, onclause=review_like_table.c.review_id==review_table.c.id).join(user_table, onclause=review_table.c.user_id==user_table.c.id).join(game_table, onclause=review_table.c.game_id==game_table.c.id).group_by(review_table.c.id, user_table.c.id,game_table.c.id).order_by(func.count(distinct(review_like_table.c.user_id), ).desc())
        result = await db.execute(query)
        result = result.all()
        return result
    
    query = select(review_table.c.id, review_table.c.grade, review_table.c.comment, review_table.c.created_at,
                    user_table.c.id.label('user_id'), user_table.c.username, user_table.c.img, 
                    game_table.c.id.label('game_id'), game_table.c.title, game_table.c.cover, game_table.c.slug, 
                    func.count(review_like_table.c.user_id).label('like_count')).limit(limit).offset(offset).where(review_table.c.comment != None).join(review_like_table, onclause=review_like_table.c.review_id==review_table.c.id).join(user_table, onclause=review_table.c.user_id==user_table.c.id).join(game_table, onclause=review_table.c.game_id==game_table.c.id).group_by(review_table.c.id, user_table.c.id,game_table.c.id).order_by(func.count(distinct(review_like_table.c.user_id), ))
    result = await db.execute(query)
    result = result.all()
    return result