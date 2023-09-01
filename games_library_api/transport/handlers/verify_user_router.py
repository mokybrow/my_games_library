from fastapi import APIRouter

from games_library_api.services.after_registration import verify_user_by_email

router = APIRouter()


@router.get("/user/verify/{token}/{email}")
async def verify_user_by_email_route(token: str, email: str):
    await verify_user_by_email(token=token)
    return {"Почта подтверждена": f"{email}!"}
