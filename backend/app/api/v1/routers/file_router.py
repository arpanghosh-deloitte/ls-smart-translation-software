from fastapi import APIRouter, Depends, UploadFile, File, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import acquire_db_session as async_session
from app.api.v1.controllers.file_controller import (
    fetch_files_controller,
    fetch_file_by_id_controller,
    upload_file_controller,
    update_file_controller,
    delete_file_controller
)
from app.schemas.file_schema import FileRead, FileUpdate
from typing import List

file_router = APIRouter(prefix="/files", tags=["Files"])

async def get_db():
    async with async_session() as session:
        yield session

@file_router.get("/", response_model=List[FileRead])
async def list_files(
    package_id: int = Query(None),
    db: AsyncSession = Depends(get_db)
):
    return await fetch_files_controller(db, package_id)

@file_router.get("/{file_id}", response_model=FileRead)
async def get_file(file_id: int, db: AsyncSession = Depends(get_db)):
    return await fetch_file_by_id_controller(db, file_id)

@file_router.post("/upload/", response_model=FileRead, status_code=201)
async def upload_file(package_id: int, file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    return await upload_file_controller(db, package_id, file)

@file_router.put("/{file_id}", response_model=FileRead)
async def update_file(file_id: int, payload: FileUpdate, db: AsyncSession = Depends(get_db)):
    return await update_file_controller(db, file_id, payload)

@file_router.delete("/{file_id}", status_code=204)
async def remove_file(file_id: int, db: AsyncSession = Depends(get_db)):
    await delete_file_controller(db, file_id)