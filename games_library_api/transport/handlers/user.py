from fastapi import APIRouter, Depends, FastAPI

router = APIRouter()


@router.get("/")
async def home_page():
    return {"Privet":"Mir"}