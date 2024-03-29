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
from .transport.handlers.search_router import router as search_router


def _setup_api_routers(
    api: APIRouter,
) -> None:
    api.include_router(user_router, tags=['user profile'], prefix='/api')
    api.include_router(auth_router, prefix='/api')
    api.include_router(game_router, tags=['game router'], prefix='/api')
    api.include_router(list_router, tags=['lists'], prefix='/api')
    api.include_router(admin_router, tags=['admin dashboard'], prefix='/api')
    api.include_router(review_router, tags=['review'], prefix='/api')
    api.include_router(article_router, tags=['article'], prefix='/api')
    api.include_router(search_router, tags=['search'], prefix='/api')


@lru_cache
def make_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.project_name,
    )
    _setup_api_routers(app.router)

    origins = [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://cultofbear.ru',
        'https://cultofbear.ru',
        'http://localhost:3000',
        'https://dudesplay.ru',
        'http://localhost:45678'
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    return app
