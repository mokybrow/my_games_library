import datetime
import uuid

from typing import Any

from pydantic import UUID4
from sqlalchemy import delete, insert, select, update
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.models.list_model import CreateListModel
from games_library_api.schemas.database import (
    game_table,
    like_game_table,
    like_table,
    list_game_table,
    list_table,
    passed_game_table,
    passed_table,
    user_table,
    wantplay_game_table,
    wantplay_table,
    user_activity_table,
    list_user_table
)
from games_library_api.services.list_slug import making_slug


async def create_list(
    db: AsyncSession,
    owner_id: UUID4,
    new_list: CreateListModel,
    username: str
) -> bool:
    query = select(list_table.c.name).filter(list_table.c.slug == await making_slug(username +'_' + new_list.name))
    result = await db.execute(query)
    if result.all():
        return False
    stmt = insert(list_table).values(
        id=uuid.uuid4(),
        owner_id=owner_id,
        name=new_list.name,
        slug=await making_slug(username+'_'+new_list.name),
        description=new_list.description,
        is_private=new_list.is_private,
    )
    await db.execute(stmt)
    await db.commit()
    query = select(list_table.c.id).filter(list_table.c.slug == await making_slug(username +'_' + new_list.name))
    result = await db.execute(query)
    list_id = result.all()
    return list_id[0][0]


async def check_list(
    db: AsyncSession,
    new_list: CreateListModel,
    username: str
) -> bool:
    query = select(list_table.c.name).filter(list_table.c.slug == await making_slug(username +'_' + new_list.name))
    result = await db.execute(query)
    return result.all()

async def add_cover_to_list(
    db: AsyncSession,
    cover: str,
    list_id: str,
):
    stmt = (
        update(list_table)
        .where(list_table.c.id == list_id)
        .values(
            cover=cover,
        )
    )
    await db.execute(stmt)
    await db.commit()
    return True


async def get_list(db: AsyncSession) -> Any:
    query = select(list_table.c.name, list_table.c.cover).filter(list_table.c.is_private == False)
    result = await db.execute(query)
    return result.all()


async def get_user_list(db: AsyncSession, user_id: UUID4) -> Any:
    query = select(
        list_table
    ).where(list_table.c.owner_id == user_id)
    result = await db.execute(query)

    return result.all()


async def get_user_added(db: AsyncSession, user_id: UUID4) -> Any:
    query = select(
        list_table
    ).join(list_user_table, onclause=list_user_table.c.list_id==list_table.c.id).where(list_user_table.c.user_id==user_id)
    result = await db.execute(query)

    return result.all()


async def add_game_to_user_list(list_id: UUID4, game_id: UUID4, db: AsyncSession) -> bool:
    query = select(list_game_table).where(list_game_table.c.list_id==list_id, list_game_table.c.game_id == game_id)
    result = await db.execute(query)
    result = result.all()
    if result:
        print(result)
        stmt = delete(list_game_table).where(list_game_table.c.list_id==list_id, list_game_table.c.game_id == game_id)
        await db.execute(stmt)
        await db.commit()
        return None
    stmt = insert(list_game_table).values(
            list_id=list_id,
            game_id=game_id,
            created_at=datetime.datetime.utcnow(),
        )
    await db.execute(stmt)
    await db.commit()
    return None


async def universal_game_passed(user_id: UUID4, game_id: UUID4, db: AsyncSession) -> bool:
    query = select(passed_game_table.c.game_id, passed_game_table.c.list_id).select_from(passed_game_table).join(passed_table, onclause=passed_game_table.c.list_id==passed_table.c.id, isouter=True).where(passed_table.c.user_id == user_id, passed_game_table.c.game_id == game_id)
    result = await db.execute(query)
    list_a_game = result.all()
    if  list_a_game:
        stmt = delete(passed_game_table).where(passed_game_table.c.game_id == list_a_game[0][0], passed_game_table.c.list_id == list_a_game[0][1])
        delete_activity = delete(user_activity_table).where(user_activity_table.c.game_id == list_a_game[0][0], user_activity_table.c.user_id == user_id, user_activity_table.c.activity_type == 'passed')
        await db.execute(delete_activity)
        await db.execute(stmt)
        await db.commit()
        return False
    list_id = select(passed_table.c.id).where(passed_table.c.user_id == user_id)
    list_id = await db.execute(list_id)
    list_id = list_id.all()
    stmt = insert(passed_game_table).values(
        list_id=list_id[0][0],
        game_id=game_id,
        created_at=datetime.datetime.utcnow(),
    )
    game_info_query = select(game_table.c.title, game_table.c.slug, game_table.c.cover,).where(game_table.c.id == game_id)
    game_info = await db.execute(game_info_query)
    game_info = game_info.all()
    activity = insert(user_activity_table).values(
        id=uuid.uuid4(),
        user_id=user_id,
        title=game_info[0][0],
        cover=game_info[0][2],
        slug=game_info[0][1],
        game_id=game_id,
        activity_type='passed',
        created_at=datetime.datetime.utcnow(),
    )
    await db.execute(stmt)
    await db.execute(activity)
    await db.commit()
    return True



async def universal_game_wanted(user_id: UUID4, game_id: UUID4, db: AsyncSession) -> bool:
    query = select(wantplay_game_table.c.game_id, wantplay_game_table.c.list_id).select_from(wantplay_game_table).join(wantplay_table, onclause=wantplay_game_table.c.list_id==wantplay_table.c.id, isouter=True).where(wantplay_table.c.user_id == user_id, wantplay_game_table.c.game_id == game_id)
    result = await db.execute(query)
    list_a_game = result.all()
    if  list_a_game:
        stmt = delete(wantplay_game_table).where(wantplay_game_table.c.game_id == list_a_game[0][0], wantplay_game_table.c.list_id == list_a_game[0][1])
        delete_activity = delete(user_activity_table).where(user_activity_table.c.game_id == list_a_game[0][0], user_activity_table.c.user_id == user_id, user_activity_table.c.activity_type == 'wanted')
        await db.execute(delete_activity)
        await db.execute(stmt)
        await db.commit()
        return False
    list_id = select(wantplay_table.c.id).where(wantplay_table.c.user_id == user_id)
    list_id = await db.execute(list_id)
    list_id = list_id.all()

    stmt = insert(wantplay_game_table).values(
        list_id=list_id[0][0],
        game_id=game_id,
        created_at=datetime.datetime.utcnow(),
    )
    game_info_query = select(game_table.c.title, game_table.c.slug, game_table.c.cover,).where(game_table.c.id == game_id)
    game_info = await db.execute(game_info_query)
    game_info = game_info.all()
    activity = insert(user_activity_table).values(
        id=uuid.uuid4(),
        user_id=user_id,
        title=game_info[0][0],
        cover=game_info[0][2],
        slug=game_info[0][1],
        game_id=game_id,
        activity_type='wanted',
        created_at=datetime.datetime.utcnow(),
    )
    await db.execute(stmt)
    await db.execute(activity)
    await db.commit()
    return True


async def universal_game_liked(user_id: UUID4, game_id: UUID4, db: AsyncSession) -> bool:
    query = select(like_game_table.c.game_id, like_game_table.c.list_id).select_from(like_game_table).join(like_table, onclause=like_game_table.c.list_id==like_table.c.id, isouter=True).where(like_table.c.user_id == user_id, like_game_table.c.game_id == game_id)
    result = await db.execute(query)
    list_a_game = result.all()
    if  list_a_game:
        stmt = delete(like_game_table).where(like_game_table.c.game_id == list_a_game[0][0], like_game_table.c.list_id == list_a_game[0][1])
        delete_activity = delete(user_activity_table).where(user_activity_table.c.game_id == list_a_game[0][0], user_activity_table.c.user_id == user_id, user_activity_table.c.activity_type == 'liked')
        await db.execute(delete_activity)
        await db.execute(stmt)
        await db.commit()
        return False
    list_id = select(like_table.c.id).where(like_table.c.user_id == user_id)
    list_id = await db.execute(list_id)
    list_id = list_id.all()
    stmt = insert(like_game_table).values(
        list_id=list_id[0][0],
        game_id=game_id,
        created_at=datetime.datetime.utcnow(),
    )
    game_info_query = select(game_table.c.title, game_table.c.slug, game_table.c.cover,).where(game_table.c.id == game_id)
    game_info = await db.execute(game_info_query)
    game_info = game_info.all()
    activity = insert(user_activity_table).values(
        id=uuid.uuid4(),
        user_id=user_id,
        title=game_info[0][0],
        cover=game_info[0][2],
        slug=game_info[0][1],
        game_id=game_id,
        activity_type='liked',
        created_at=datetime.datetime.utcnow(),
    )
    await db.execute(stmt)
    await db.execute(activity)

    await db.commit()

    return True


async def get_wantplay_game(db: AsyncSession, user_id: UUID4) -> Any:
    query = (
        select(game_table.c.title, game_table.c.slug, game_table.c.cover)
        .where(user_table.c.id == user_id)
        .join(wantplay_table)
        .join(wantplay_game_table)
        .join(game_table)
    )
    result = await db.execute(query)
    return result.all()


async def get_passed_game(db: AsyncSession, user_id: UUID4) -> Any:
    query = (
        select( game_table.c.title, game_table.c.slug, game_table.c.cover)
        .where(user_table.c.id == user_id)
        .join(passed_table)
        .join(passed_game_table)
        .join(game_table)
    )
    result = await db.execute(query)
    return result.all()


async def get_liked_game(db: AsyncSession, user_id: UUID4) -> Any:
    query = (
        select(game_table.c.title, game_table.c.slug, game_table.c.cover)
        .where(user_table.c.id == user_id)
        .join(like_table)
        .join(like_game_table)
        .join(game_table)
    )
    result = await db.execute(query)
    return result.all()


async def delete_user_list(db: AsyncSession, list_id: UUID4) -> None:
    stmt = delete(list_table).where(list_table.c.id == list_id)
    await db.execute(stmt)
    await db.commit()


async def update_list(
    list_id: UUID4,
    db: AsyncSession,
    new_list: CreateListModel,
) -> bool:
    query = select(list_table).filter(list_table.c.slug == await making_slug(new_list.name))
    result = await db.execute(query)
    if result.all():
        return False

    stmt = (
        update(list_table)
        .values(
            name=new_list.name,
            slug=await making_slug(new_list.name),
            description=new_list.description,
            is_private=new_list.is_private,
        )
        .where(list_table.c.id == list_id)
    )
    result = await db.execute(stmt)
    await db.commit()
    return True


async def get_list_games(
    slug: str,
    db: AsyncSession,
) -> bool:
    get_list_id = (
        select(list_table.c.id).where(list_table.c.slug==slug)
    )
    list_id = await db.execute(get_list_id)
    list_id = list_id.all()
    if list_id:
        query = (
            select(list_game_table.c.game_id,  game_table.c.title, game_table.c.cover, game_table.c.slug)
            .join(game_table, onclause=list_game_table.c.game_id == game_table.c.id).where(list_game_table.c.list_id == list_id[0][0])
        )
        result = await db.execute(query)
        return result.all()
    



async def add_delete_list(
    slug: str,
    user_id: UUID4,
    db: AsyncSession,
) -> bool:
    get_list_id = (
        select(list_table.c.id).where(list_table.c.slug==slug)
    )
    list_id = await db.execute(get_list_id)
    list_id = list_id.all()
    if list_id:
        query = (
            select(list_user_table.c.list_id).where(list_user_table.c.list_id == list_id[0][0], list_user_table.c.user_id==user_id)
        )
        result = await db.execute(query)
        result =  result.all()
        if result:
            print('удаляем')
            delete_list = delete(list_user_table).where(list_user_table.c.list_id == list_id[0][0], list_user_table.c.user_id==user_id)
            result = await db.execute(delete_list)
            await db.commit()
            return None

        add_list = insert(list_user_table).values(
                list_id=list_id[0][0],
                user_id=user_id,
                added=datetime.datetime.utcnow(),
            )
        result = await db.execute(add_list)
        await db.commit()
        

async def get_list_data(
    slug: str,
    user_id: UUID4,
    db: AsyncSession,
) -> bool:
    get_list_id = (
        select(list_table.c.id).where(list_table.c.slug==slug)
    )
    list_id = await db.execute(get_list_id)
    list_id = list_id.all()
    if list_id:
        query = (
            select(list_user_table.c.user_id).join(list_table, onclause=list_table.c.id==list_user_table.c.list_id).where(list_user_table.c.list_id == list_id[0][0]).where(list_user_table.c.user_id == user_id)
        )
        result = await db.execute(query)
        return result.all()



async def check_game_in_user_wantplay(game_id: UUID4, user_id: UUID4, db: AsyncSession) -> dict:
    query = select(wantplay_game_table.c.game_id, wantplay_game_table.c.list_id, wantplay_table.c.user_id).select_from(wantplay_game_table).join(wantplay_table, onclause=wantplay_game_table.c.list_id==wantplay_table.c.id, isouter=True).where(wantplay_table.c.user_id == user_id, wantplay_game_table.c.game_id == game_id)
    result = await db.execute(query)
    list_a_game = result.all()
    if not list_a_game:
        return False
    return True


async def check_game_in_user_liked(game_id: UUID4, user_id: UUID4, db: AsyncSession) -> dict:
    query = select(like_game_table.c.game_id, like_game_table.c.list_id, like_table.c.user_id).select_from(like_game_table).join(like_table, onclause=like_game_table.c.list_id==like_table.c.id, isouter=True).where(like_table.c.user_id == user_id, like_game_table.c.game_id == game_id)
    result = await db.execute(query)
    list_a_game = result.all()
    if not list_a_game:
        return False
    return True


async def check_game_in_user_passed(game_id: UUID4, user_id: UUID4, db: AsyncSession) -> dict:
    wantplay_list_id = select(passed_table.c.id).where(passed_table.c.user_id == user_id)
    list_id_result = await db.execute(wantplay_list_id)
    game_id = select(passed_game_table.c.list_id,).where(passed_game_table.c.list_id == list_id_result.all()[0][0], passed_game_table.c.game_id==game_id)
    game_id_result = await db.execute(game_id)
    if not game_id_result.all():
        return False
    return True