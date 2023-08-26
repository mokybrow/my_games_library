from fastapi import APIRouter, Depends, FastAPI

router = APIRouter()


@router.get("/{username}")
async def user_profile(username: str):
    return {"Hello": username}


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
