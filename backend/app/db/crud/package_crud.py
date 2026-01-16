from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from app.db.models.package_model import Package
from app.schemas.package_schema import PackageCreate, PackageUpdate
from fastapi import HTTPException, status

async def get_all_packages(db: AsyncSession, project_id: int = None):
    stmt = select(Package)
    if project_id:
        stmt = stmt.where(Package.project_id == project_id)
    result = await db.execute(stmt)
    return result.scalars().all()

async def get_package_by_id(db: AsyncSession, package_id: int):
    result = await db.execute(select(Package).where(Package.id == package_id))
    package = result.scalar_one_or_none()
    if not package:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Package not found")
    return package

async def create_package(db: AsyncSession, package_in: PackageCreate):
    package = Package(**package_in.dict())
    db.add(package)
    try:
        await db.commit()
        await db.refresh(package)
        return package
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Package name already exists")

async def update_package(db: AsyncSession, package_id: int, package_in: PackageUpdate):
    package = await get_package_by_id(db, package_id)
    for var, value in package_in.dict(exclude_unset=True).items():
        setattr(package, var, value)
    await db.commit()
    await db.refresh(package)
    return package

async def delete_package(db: AsyncSession, package_id: int):
    package = await get_package_by_id(db, package_id)
    await db.delete(package)
    await db.commit()
    return None