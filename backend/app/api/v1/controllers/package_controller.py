from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.package_schema import PackageCreate, PackageUpdate
from app.db.crud.package_crud import (
    get_all_packages, get_package_by_id,
    create_package, update_package, delete_package
)

async def fetch_packages_controller(db: AsyncSession, project_id: int = None):
    return await get_all_packages(db, project_id)

async def fetch_package_by_id_controller(db: AsyncSession, package_id: int):
    return await get_package_by_id(db, package_id)

async def create_package_controller(db: AsyncSession, package_in: PackageCreate):
    return await create_package(db, package_in)

async def update_package_controller(db: AsyncSession, package_id: int, package_in: PackageUpdate):
    return await update_package(db, package_id, package_in)

async def delete_package_controller(db: AsyncSession, package_id: int):
    return await delete_package(db, package_id)