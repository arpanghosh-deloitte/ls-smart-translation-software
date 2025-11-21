from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import acquire_db_session as async_session
from app.api.v1.controllers.package_controller import (
    fetch_packages_controller,
    fetch_package_by_id_controller,
    create_package_controller,
    update_package_controller,
    delete_package_controller,
)
from app.schemas.package_schema import PackageCreate, PackageRead, PackageUpdate
from typing import List

package_router = APIRouter(prefix="/packages", tags=["Packages"])

async def get_db():
    async with async_session() as session:
        yield session

@package_router.get("/", response_model=List[PackageRead])
async def list_packages(
    project_id: int = Query(None),
    db: AsyncSession = Depends(get_db)
):
    return await fetch_packages_controller(db, project_id)

@package_router.get("/{package_id}", response_model=PackageRead)
async def get_package(package_id: int, db: AsyncSession = Depends(get_db)):
    return await fetch_package_by_id_controller(db, package_id)

@package_router.post("/", response_model=PackageRead, status_code=201)
async def add_package(payload: PackageCreate, db: AsyncSession = Depends(get_db)):
    return await create_package_controller(db, payload)

@package_router.put("/{package_id}", response_model=PackageRead)
async def update_package(package_id: int, payload: PackageUpdate, db: AsyncSession = Depends(get_db)):
    return await update_package_controller(db, package_id, payload)

@package_router.delete("/{package_id}", status_code=204)
async def remove_package(package_id: int, db: AsyncSession = Depends(get_db)):
    await delete_package_controller(db, package_id)