from fastapi import APIRouter, Depends

from games_library_api.auth.utils import auth_backend, current_active_user, fastapi_users
from games_library_api.schemas.user import User, UserCreate, UserRead

router = APIRouter()


router.include_router(fastapi_users.get_auth_router(auth_backend), prefix='/auth/jwt', tags=['auth'])
router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix='/auth',
    tags=['auth'],
)
router.include_router(
    fastapi_users.get_reset_password_router(),
    prefix='/auth',
    tags=['auth'],
)
router.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix='/auth',
    tags=['auth'],
)


@router.get('/check/authenticated-route')
async def authenticated_route(user: User = Depends(current_active_user)) -> dict:
    return {'message': f'Hello {user.email}!'}
