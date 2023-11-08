from typing import Any, Optional

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from pydantic import UUID4
from sqlalchemy.ext.asyncio import AsyncSession

from games_library_api.database import get_async_session

from games_library_api.integrations.search_operation import search
from games_library_api.models import error_model,  search_model

router = APIRouter()


@router.get("/search", response_model=list[search_model.SearchResponseModel])
async def search_router(
    tag: str,
    title: Any,
    db: AsyncSession = Depends(get_async_session),
):
    result = await search(tag=tag, title=title, db=db)
    if not result:
        error = error_model.ErrorResponseModel(details='No Data')
        return JSONResponse(
            content=error.model_dump(),
            status_code=status.HTTP_404_NOT_FOUND,
        )
    return result