from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.models.file_model import File
from app.schemas.file_schema import FileCreate, FileUpdate
from fastapi import HTTPException, status

async def get_all_files(db: AsyncSession, package_id: int = None):
    stmt = select(File)
    if package_id:
        stmt = stmt.where(File.package_id == package_id)
    result = await db.execute(stmt)
    return result.scalars().all()

async def get_file_by_id(db: AsyncSession, file_id: int):
    result = await db.execute(select(File).where(File.id == file_id))
    file = result.scalar_one_or_none()
    if not file:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="File not found")
    return file

async def create_file(db: AsyncSession, file_in: FileCreate):
    file = File(**file_in.dict())
    db.add(file)
    await db.commit()
    await db.refresh(file)
    return file

async def update_file(db: AsyncSession, file_id: int, file_in: FileUpdate):
    file = await get_file_by_id(db, file_id)
    for var, value in file_in.dict(exclude_unset=True).items():
        setattr(file, var, value)
    await db.commit()
    await db.refresh(file)
    return file

async def delete_file(db: AsyncSession, file_id: int):
    file = await get_file_by_id(db, file_id)
    await db.delete(file)
    await db.commit()
    return file  # return deleted record for controller to handle physical deletion