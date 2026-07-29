from typing import Optional
from pydantic import BaseModel, ConfigDict, Field
import uuid
from datetime import datetime

class TripItemCreate(BaseModel):
    trip_id: uuid.UUID
    gear_item_id: uuid.UUID

    quantity: int = 1
    is_packed: bool = False
    
    recorded_weight: Optional[int] = None
    recorded_name: Optional[str] = Field(None, max_length=255)

class TripItemUpdate(BaseModel):
    gear_item_id: Optional[uuid.UUID] = None
    quantity: Optional[int] = None
    is_packed: Optional[bool] = None
    recorded_weight: Optional[int] = None
    recorded_name: Optional[str] = Field(None, max_length=255)

class TripItemResponse(BaseModel):
    id: uuid.UUID
    trip_id: uuid.UUID
    gear_item_id: Optional[uuid.UUID]

    quantity: int
    recorded_weight: int
    recorded_name: str = Field(..., min_length=1, max_length=255)
    is_packed: bool

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

