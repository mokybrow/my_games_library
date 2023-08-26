import httpx


async def verify_user_by_email(token: str):
    async with httpx.AsyncClient() as client:
        r = await client.post(f'http://0.0.0.0:8000/auth/verify',
                               json={"token": f"{token}"})
