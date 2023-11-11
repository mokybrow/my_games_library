import base64
import datetime

from typing import Annotated, Any, Optional

from fastapi import APIRouter, Depends, Form, HTTPException, UploadFile, status
from fastapi.responses import JSONResponse
from pydantic import UUID4, Json
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.auth.utils import current_active_user
from games_library_api.database import get_async_session
from games_library_api.integrations.articles_operations import (
    approve_create_article,
    create_article,
    get_all_article,
    get_all_article_count,
    get_article,
    like_article,
)
from games_library_api.models import articles_model, error_model
from games_library_api.schemas.user import User

router = APIRouter()

async def active_user_with_permission(user: User = Depends(current_active_user)):
    # At this point, you are sure you have an active user at hand. Otherwise, the `current_active_user` would already have thrown an error
    if not user.reporter:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return user
from pydantic import BaseModel



@router.post('/article/create')
async def create_article_router(
    model: articles_model.ArticleCreateModel,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(active_user_with_permission),
):
    print("АЛО", model,model.tags)
    if not user.reporter:
        error = error_model.ErrorResponseModel(details='Access is denied')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    # if cover:
    #     img_bytes = cover.file.read()
    #     base64_string = base64.b64encode(img_bytes).decode('utf-8')
    # if not cover:
    #     base64_string = None
    result = await create_article(title=model.title, text=model.text, tags=model.tags, user_id=user.id, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='List with this name already exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    return {"detail": True}

@router.post('/article/approve/create')
async def approvecreate_article_router(
    title: str,
    db: AsyncSession = Depends(get_async_session),
    user: User = Depends(active_user_with_permission),
):
    result = await approve_create_article(title=title, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='Article with this name already exist')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return {'detail': True}


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
        error = error_model.ErrorResponseModel(details='No data')
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


@router.get('/article/get/one', response_model=articles_model.ArticleResponseModel)
async def get_one_article_router(
    slug: str,
    user_id: UUID4 = None,
    db: AsyncSession = Depends(get_async_session),
):
    result = await get_article(user_id=user_id, db=db, slug=slug)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_400_BAD_REQUEST,
        )
    return result[0]