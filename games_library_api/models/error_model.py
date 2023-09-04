from pydantic import BaseModel


class ErrorResponseModel(BaseModel):
    details: str
