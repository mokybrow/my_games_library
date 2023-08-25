from fastapi import BackgroundTasks, FastAPI
from starlette.responses import JSONResponse
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from typing import Any, List, Dict
import os
from dotenv import load_dotenv

load_dotenv()

class EmailSchema(BaseModel):
    email: List[EmailStr]
    body: Dict[str, Any]


conf = ConnectionConfig(
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME'),
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD'),
    MAIL_FROM = os.environ.get('MAIL_FROM'),
    MAIL_PORT = 587,
    MAIL_SERVER = os.environ.get('MAIL_SERVER'),
    MAIL_FROM_NAME="Медведь Сергеевич",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True,
    TEMPLATE_FOLDER = './templates',
)


async def send_in_background(
    email: EmailSchema
    ) -> JSONResponse:
    html = """<p>Hi this test mail, thanks for using Fastapi-mail</p> """
    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=email.get("email"),
        template_body=email.get("body"),
        subtype=MessageType.html,
        )
    print(email)
    fm = FastMail(conf)

    # await fm.send_message(message)
    await fm.send_message(message, template_name='email.html')

    return JSONResponse(status_code=200, content={"message": "email has been sent"})