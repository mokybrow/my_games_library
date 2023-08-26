import httpx


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
