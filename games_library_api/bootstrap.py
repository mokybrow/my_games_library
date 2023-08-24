from functools import lru_cache


from .settings import get_settings
from fastapi import APIRouter, FastAPI
from .transport.handlers.user import router
from .transport.handlers.auth import router as auth_router


def _setup_api_routers(
    api: APIRouter,
) -> None:
    api.include_router(router, tags=["Main Page"])
    api.include_router(auth_router)


@lru_cache
def make_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.project_name,
        # debug=settings.debug,
    )
    _setup_api_routers(app.router)  # noqa

    return app
