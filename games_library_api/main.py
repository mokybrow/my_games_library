from uvicorn import run

from .bootstrap import make_app  # noqa


def main() -> None:
    run(
        app="games_library_api.main:make_app",
        host="0.0.0.0",
        port=8000,
        factory=True,
        workers=1,
        reload=True,
    )
