from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FileBase(BaseModel):
    name: str
    path: str
    status: Optional[str] = "uploaded"
    translation_status: Optional[str] = "not_translated"
    translated_path: Optional[str] = None

class FileCreate(FileBase):
    package_id: int

class FileUpdate(BaseModel):
    name: Optional[str] = None
    status: Optional[str] = None
    translation_status: Optional[str] = None
    translated_path: Optional[str] = None

class FileRead(FileBase):
    id: int
    package_id: int
    uploaded_at: datetime

    class Config:
        orm_mode = True