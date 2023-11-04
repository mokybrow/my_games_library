import base64
import datetime

from typing import Any, Optional

from fastapi import APIRouter, Depends, UploadFile, status
from fastapi.responses import JSONResponse
from pydantic import UUID4, Json
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.articles_operations import (
    create_article,
    get_all_article,
    get_all_article_count,
    like_article,
)
from games_library_api.models import articles_model, error_model
from games_library_api.schemas.user import User

router = APIRouter()


@router.post('/article/create')
async def create_article_router(
    title: str,
    cover: Optional[UploadFile | str],
    text: str,
    tags: str,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    if not user.reporter:
        error = error_model.ErrorResponseModel(details='Access is denied')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    img_bytes = cover.file.read()
    base64_string = base64.b64encode(img_bytes).decode('utf-8')
    result = await create_article(title=title, cover=base64_string, text=text, tags=tags, user_id=user.id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='List with this name already exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    return {"detail": True}


@router.get('/article/get/all', response_model=list[articles_model.ArticleResponseModel])
async def get_all_article_router(
    offset: int = None,
    limit: int = None,
    sort: Optional[str] = None,
    tag: Optional[str] = None,
    user_id: UUID4 = None,
    db: AsyncSession = Depends(get_async_session),
):
    result = await get_all_article(offset=offset, limit=limit, sort=sort,tag=tag, user_id=user_id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='List with this name already exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    return result


@router.get('/article/all/count', response_model=articles_model.GetArticleCountResponseModel)
async def get_all_reviews_count_router(
        tag: Optional[str] = None,
    db: AsyncSession = Depends(get_async_session),
):
    result = await get_all_article_count(tag=tag, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )

    return result[0]


@router.post('/article/like')
async def like_article_router(
    article_id: str,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(current_active_user),
):
    result = await like_article(article_id=article_id, user_id=user.id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='List with this name already exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    return {"detail": True}
