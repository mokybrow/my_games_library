import httpx
from pydantic import UUID4
from sqlalchemy import UUID


async def veryfiy_request(user_email: str):
    async with httpx.AsyncClient() as client:
        r = await client.post(
            f"http://0.0.0.0:8000/auth/request-verify-token",
            json={"email": f"{user_email}"},
        )


async def verify_user_by_email(token: str):
    async with httpx.AsyncClient() as client:
        r = await client.post(
            f"http://0.0.0.0:8000/auth/verify", json={"token": f"{token}"}
        )


async def create_default_lists(user_id: UUID):
    async with httpx.AsyncClient() as client:
        r = await client.post(
            f"http://0.0.0.0:8000/lists/create_default_list",
            params={"user_id": f"{user_id}"},
        )
