import os
import uuid
from typing import Optional

from dotenv import load_dotenv
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (
    AuthenticationBackend,
    BearerTransport,
    CookieTransport,
    JWTStrategy,
)
from fastapi_users.db import SQLAlchemyUserDatabase

from games_library_api.database import get_user_db
from games_library_api.email.send_mail import send_in_background
from games_library_api.schemas.user import User
from games_library_api.services.after_registration import (
    create_default_lists,
    veryfiy_request,
)

load_dotenv()

SECRET = os.environ.get("SECRET")


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        # print(f"User {user.id} has registered.")
        await veryfiy_request(user_email=user.email)

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        # print(f"Verification requested for user {user.id}. Verification token: {token}")
        await send_in_background(
            email={
                "email": [f"{user.email}"],
                "body": {"token": f"{token}", "email": f"{user.email}"},
            }
        )

    async def on_after_verify(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has been verified")
        await create_default_lists(user_id=user.id)


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


cookie_transport = CookieTransport(cookie_name="mishkastudio", cookie_max_age=3600)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
current_superuser = fastapi_users.current_user(active=True, superuser=True)
