FROM python:3.11


WORKDIR /fastapi

COPY /pyproject.toml /fastapi

RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install
# RUN poetry add gunicorn

COPY . .

CMD gunicorn api.main:make_app --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind=0.0.0.0:8000