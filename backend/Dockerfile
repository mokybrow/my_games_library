FROM python:3.11

WORKDIR  /fastapi

COPY /pyproject.toml /fastapi

RUN pip3 install poetry==1.6.1
RUN poetry config virtualenvs.create false
RUN poetry install

COPY alembic.ini /fastapi
COPY migrations /fastapi/migrations

WORKDIR  /fastapi/backend

COPY . /fastapi/backend/

WORKDIR  /fastapi

#CMD gunicorn backend.main:make_app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000
