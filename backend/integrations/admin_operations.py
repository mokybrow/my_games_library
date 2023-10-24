import datetime as DT
import uuid

from typing import Any

import requests

from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table, user_table


async def get_all_users(page: int, db: AsyncSession) -> Any:
    if page == 1:
        page_offset = 0
    else:
        page_offset = (page - 1) * 36
    query = (
        select(user_table.c.id, user_table.c.name, user_table.c.username, user_table.c.email)
        .offset(page_offset)
        .limit(36)
    )
    result = await db.execute(query)
    return result.all()


async def game_parser(db: AsyncSession) -> Any:
    count = 1
    while count < 10:
        r = requests.get(
            f'https://api.rawg.io/api/games?key=1ae731eafea74e33907d89607c9483cb&page={count}&page_size=50'
        )
        # print(count)
        platform = []
        parent_platforms = []
        platform_name = []
        genres = []
        tags = []
        for i in r.json()['results']:
            # print('Название игры',i['slug'])

            for k in i['genres']:
                genres.append(k['name'])

            for q in i['parent_platforms']:
                parent_platforms.append(q['platform']['name'])

            for j in i['platforms']:
                platform.append(j['platform']['slug'])
                platform_name.append(j['platform']['name'])

            for w in i['tags']:
                tags.append(w['name'])

            query = select(game_table.c.slug).where(game_table.c.slug == i['slug'])
            result = await db.execute(query)
            if result.all():
                count += 1
            query = select(game_table.c.slug).where(game_table.c.slug == i['slug'])
            result = await db.execute(query)
            if not result.all():
                # print(i['name'], i['background_image'],i['slug'], i['released'], i['parent_platforms'], i['genres'])
                if i['released'] != None:
                    date = DT.datetime.strptime(i['released'], '%Y-%m-%d').date()
                if i['released'] == None:
                    date = None
                if i['esrb_rating'] == None:
                    esrb_rating = None
                if i['esrb_rating'] != None:
                    esrb_rating = i['esrb_rating']['name']
                stmt = insert(game_table).values(
                    id=uuid.uuid4(),
                    title=i['name'],
                    cover=i['background_image'],
                    description=None,
                    slug=i['slug'],
                    release=date,
                    playtime=i['playtime'],
                    platform=platform,
                    platform_name=platform_name,
                    parent_platform=parent_platforms,
                    genre=genres,
                    tags=tags,
                    esrb_rating=esrb_rating,
                )

                await db.execute(stmt)
                await db.commit()
                platform = []
                parent_platforms = []
                platform_name = []
                genres = []
                tags = []
            # print(platform)
            # print(parent_platforms)
            # print(platform_name)
            # print(genres)
            # print(tags)
        count += 1
