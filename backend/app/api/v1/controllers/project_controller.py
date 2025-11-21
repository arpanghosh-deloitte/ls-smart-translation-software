from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.project_schema import ProjectCreate, ProjectUpdate
from app.db.crud.project_crud import (
    get_all_projects, get_project_by_id,
    create_project, update_project, delete_project,
)

async def fetch_projects_controller(db: AsyncSession):
    return await get_all_projects(db)

async def fetch_project_by_id_controller(db: AsyncSession, project_id: int):
    return await get_project_by_id(db, project_id)

async def create_project_controller(db: AsyncSession, project_in: ProjectCreate):
    return await create_project(db, project_in)

async def update_project_controller(db: AsyncSession, project_id: int, project_in: ProjectUpdate):
    return await update_project(db, project_id, project_in)

async def delete_project_controller(db: AsyncSession, project_id: int):
    return await delete_project(db, project_id)