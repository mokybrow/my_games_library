import datetime as DT
from typing import Any
import uuid
import requests

from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import user_table, game_table


async def get_all_users(db: AsyncSession) -> Any:
    query = select(user_table.c.id, user_table.c.name, user_table.c.username, user_table.c.email)
    result = await db.execute(query)
    return result.all()


async def game_parser(db: AsyncSession)-> Any:
        count = 10001
        while count < 30000:
            r = requests.get(f'https://api.rawg.io/api/games?key=1ae731eafea74e33907d89607c9483cb&page={count}&page_size=50')
            #print(r.json())
            for i in r.json()['results']:
                    query = select(game_table.c.slug).where(game_table.c.slug == i['slug'])
                    result = await db.execute(query)
                    if result.all():
                          count+=1
                    query = select(game_table.c.slug).where(game_table.c.slug == i['slug'])
                    result = await db.execute(query)
                    if not result.all():
                        #print(i['name'], i['background_image'],i['slug'], i['released'], i['parent_platforms'], i['genres'])
                        if i['released'] != None:
                            date = DT.datetime.strptime(i['released'], '%Y-%m-%d').date()
                            stmt = insert(game_table).values(id=uuid.uuid4(), title=i['name'], cover=i['background_image']
                                                                ,description=None,slug=i['slug'],release=date, platform=i['parent_platforms'],
                                                                genre=i['genres'])

                            await db.execute(stmt)
                            await db.commit()
            count+=1
