from uvicorn import run

from .bootstrap import make_app  # noqa


def main() -> None:
    run(
        app="backend.main:make_app",
        host="localhost",
        port=8000,
        factory=True,
        workers=1,
        reload=True,
    )
