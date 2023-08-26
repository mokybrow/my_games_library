from fastapi import APIRouter, Depends, FastAPI

router = APIRouter()


@router.get("/games/{id}")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/games/{genre}/")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/games/best/")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/games/best/{time_interval}")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/games/novelty/")
async def user_profile():
    return {"Privet": "Mir"}


@router.get("/games/{title}/reviews")
async def user_profile():
    return {"Privet": "Mir"}
