from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import UploadFile
from app.schemas.file_schema import FileCreate, FileUpdate
from app.db.crud.file_crud import (
    get_all_files, get_file_by_id,
    create_file, update_file, delete_file
)
from app.services.storage import (
    save_file_to_local_s3, delete_file_from_local_s3,
    # save_file_to_s3, delete_file_from_s3
)

async def upload_file_controller(db: AsyncSession, package_id: int, file: UploadFile):
    # LOCAL:
    s3_key = await save_file_to_local_s3(package_id, file)
    # # For AWS S3:
    # s3_key = await save_file_to_s3(package_id, file)
    file_create = FileCreate(
        name=file.filename, path=s3_key, package_id=package_id
    )
    return await create_file(db, file_create)

async def update_file_controller(db: AsyncSession, file_id: int, file_in: FileUpdate):
    # Optionally: Update S3 if the filename or path must change
    return await update_file(db, file_id, file_in)

async def delete_file_controller(db: AsyncSession, file_id: int):
    file = await delete_file(db, file_id)  # returns the File DB object
    if file:
        # LOCAL:
        delete_file_from_local_s3(file.path)
        # # For AWS S3:
        # delete_file_from_s3(file.path)
    return file

async def fetch_files_controller(db: AsyncSession, package_id: int = None):
    return await get_all_files(db, package_id)

async def fetch_file_by_id_controller(db: AsyncSession, file_id: int):
    return await get_file_by_id(db, file_id)