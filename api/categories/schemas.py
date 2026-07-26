from typing import Optional
from datetime import datetime
import uuid

from pydantic import BaseModel, ConfigDict, Field

class CategoryCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)

class CategoryUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)

class CategoryResponse(BaseModel):
    id: uuid.UUID
    user_id: Optional[uuid.UUID]
    title: str = Field(..., min_length=1, max_length=100)
    deleted_at: Optional[datetime]
    is_default: bool
    # icon: Mapped[str] = mapped_column() TODO: Add in later iteration

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)