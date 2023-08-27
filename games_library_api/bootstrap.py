from functools import lru_cache

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .settings import get_settings
from .transport.handlers.admin_router import router as admin_router
from .transport.handlers.auth_router import router as auth_router
from .transport.handlers.game_router import router as game_router
from .transport.handlers.list_router import router as list_router
from .transport.handlers.user_router import router as user_router
from .transport.handlers.verify_user_router import router as verify_router


def _setup_api_routers(
    api: APIRouter,
) -> None:
    api.include_router(user_router, tags=["user profile"])
    api.include_router(auth_router)
    api.include_router(verify_router, tags=["verify email"])
    api.include_router(game_router, tags=["game router"])
    api.include_router(list_router, tags=["ops with lists"])
    api.include_router(admin_router, tags=["admin moves"])


@lru_cache
def make_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.project_name,
        # debug=settings.debug,
    )
    _setup_api_routers(app.router)  # noqa

    origins = [
        "http://localhost",
        "http://localhost:8000/",
        "http://localhost:8000/auth/login",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app
