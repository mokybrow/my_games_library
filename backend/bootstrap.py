from functools import lru_cache

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .settings import get_settings
from .transport.handlers.admin_router import router as admin_router
from .transport.handlers.article_router import router as article_router
from .transport.handlers.auth_router import router as auth_router
from .transport.handlers.game_router import router as game_router
from .transport.handlers.list_router import router as list_router
from .transport.handlers.review_router import router as review_router
from .transport.handlers.user_router import router as user_router


def _setup_api_routers(
    api: APIRouter,
) -> None:
    api.include_router(user_router, tags=['user profile'])
    api.include_router(auth_router)
    api.include_router(game_router, tags=['game router'])
    api.include_router(list_router, tags=['lists'])
    api.include_router(admin_router, tags=['admin dashboard'])
    api.include_router(review_router, tags=['review'])
    api.include_router(article_router, tags=['article'])


@lru_cache
def make_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.project_name,
    )
    _setup_api_routers(app.router)

    origins = [
        'http://localhost:3000/',
        'http://127.0.0.1:3000/',
        'http://localhost:8000/',
        'http://194.67.68.6:8000/'
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    return app
