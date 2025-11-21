from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PackageBase(BaseModel):
    name: str
    status: Optional[str] = "active"

class PackageCreate(PackageBase):
    project_id: int

class PackageUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None

class PackageRead(PackageBase):
    id: int
    project_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True