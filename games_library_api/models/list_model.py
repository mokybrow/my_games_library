from typing import Optional

from pydantic import BaseModel


class ListResponseModel(BaseModel):
    name: str
    cover: Optional[str]
    description: Optional[str]
