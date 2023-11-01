import os

from typing import Any, Optional

from fastapi import BackgroundTasks
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from pydantic import BaseModel, EmailStr
from starlette.responses import JSONResponse

from games_library_api.settings import get_settings

settings = get_settings()


conf = ConnectionConfig(
    MAIL_USERNAME=settings.mail_username,
    MAIL_PASSWORD=settings.mail_password,
    MAIL_FROM=settings.mail_from,
    MAIL_PORT=587,
    MAIL_SERVER=settings.mail_server,
    MAIL_FROM_NAME='GAMIFICATION',
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
)


async def sending_mail(email: str, subject: str, body: str) -> JSONResponse:
    html = f"""<p>{body}</p>"""

    message = MessageSchema(subject=subject, recipients=[email], body=html, subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200, content={"message": "email has been sent"})
