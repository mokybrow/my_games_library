import datetime
import uuid

from operator import or_
from typing import Any

from pydantic import UUID4, Json
from sqlalchemy import JSON, Text, case, cast, desc, distinct, func, insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.schemas.database import game_table, article_table
from games_library_api.services.list_slug import making_slug


async def search(tag: str, title: str, db: AsyncSession): 
    title.split()
    title = ' '.join(title.split())
    if tag == 'game': 
        title = await making_slug(title)
        search_game = select(game_table.c.title, game_table.c.cover, game_table.c.slug).filter(func.lower(game_table.c.title).like(f"%{title.lower()}%"))
        search_game = await db.execute(search_game)
        search_game = search_game.all()

        if not search_game:
            return False
        return search_game
    if tag == 'article':
        search_article = select(article_table.c.title, article_table.c.cover, article_table.c.slug).filter(func.lower(article_table.c.title).like(f"%{title}%"))
        search_article = await db.execute(search_article)
        search_article = search_article.all()

        if not search_article:
            title = await making_slug(title)
            search_article_en = select(article_table.c.title, article_table.c.cover, article_table.c.slug).filter(func.lower(article_table.c.title).like(f"%{title}%"))
            search_article_en = await db.execute(search_article_en)
            search_article_en = search_article_en.all()
            return search_article_en
        
        return search_article

