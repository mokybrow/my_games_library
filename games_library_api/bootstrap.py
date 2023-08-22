from functools import lru_cache


from .settings import get_settings
from fastapi import APIRouter, FastAPI
from .transport.handlers.user import router


def _setup_api_routers(
    api: APIRouter,
) -> None:
    api.include_router(router, tags=["Main Page"])


@lru_cache
def make_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(
        title=settings.project_name,
        # debug=settings.debug,
    )
    _setup_api_routers(app.router)  # noqa

    return app
