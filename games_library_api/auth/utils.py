import os
import uuid

from typing import Any, Optional

from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import AuthenticationBackend, CookieTransport, JWTStrategy
from fastapi_users.db import SQLAlchemyUserDatabase

from games_library_api.database import get_user_db
from games_library_api.email.send_mail import sending_mail
from games_library_api.integrations.after_registration import  create_default_lists
from games_library_api.schemas.user import User
from games_library_api.settings import get_settings

settings = get_settings()

class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = settings.secret
    verification_token_secret = settings.secret
    
    async def on_after_register(self, user: User, request: Optional[Request] = None):
        await sending_mail(email=user.email, subject='Спасибо за регистрацию в GAMIFICATION', body=settings.reg_body)
        await create_default_lists(user_id=user.id)
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        await sending_mail(email=user.email, subject='Восстановление пароля в GAMIFICATION', body=f'{settings.fog_pass} + {token}')
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_reset_password(self, user: User, request: Optional[Request] = None):
        await sending_mail(email=user.email, subject='Пароль в GAMIFICATION изменён', body=f'{settings.res_pass}')
        print(f"User {user.id} has reset their password.")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        await sending_mail(email=user.email, subject='Спасибо за регистрацию в GAMIFICATION', body=f'{settings.ver_body} + {token}')
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def on_after_verify(
        self, user: User, request: Optional[Request] = None
    ):
        print(f"User {user.id} has been verified")



async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)) -> Any:
    yield UserManager(user_db)


cookie_transport = CookieTransport(cookie_name='gamification', cookie_max_age=3600)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=settings.secret, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name='jwt',
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)
current_superuser = fastapi_users.current_user(active=True, superuser=True)
