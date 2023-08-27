from fastapi import APIRouter, Depends, FastAPI

from games_library_api.auth.utils import current_active_user
from games_library_api.schemas.user import User

router = APIRouter()


@router.get("/{username}")
async def user_profile(username: str, user: User = Depends(current_active_user)):
    if username == user.username:
        return {"Hello": f"{username} yor profile {user.username}"}
    return {"Warning": "is not your profile"}


@router.get("/{username}/lists")
async def user_profile(username: str):
    return {"Hello": username}


@router.post("/{username}/lists")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/{username}/passed")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/{username}/want_to_play")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/{username}/like")
async def user_profile():
    return {"Privet": "Mir"}
