from uvicorn import run

from .bootstrap import make_app  # noqa


def main() -> None:
    run(
        app="backend.main:make_app",
        host="127.0.0.1",
        port=8888,
        factory=True,
        workers=1,
        reload=True,
    )
