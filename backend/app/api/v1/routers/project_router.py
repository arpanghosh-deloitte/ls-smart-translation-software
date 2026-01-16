from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import acquire_db_session as async_session
from app.api.v1.controllers.project_controller import (
    fetch_projects_controller,
    fetch_project_by_id_controller,
    create_project_controller,
    update_project_controller,
    delete_project_controller,
)
from app.schemas.project_schema import ProjectCreate, ProjectRead, ProjectUpdate
from typing import List

project_router = APIRouter(prefix="/projects", tags=["Projects"])

async def get_db():
    async with async_session() as session:
        yield session

@project_router.get("/", response_model=List[ProjectRead])
async def list_projects(db: AsyncSession = Depends(get_db)):
    return await fetch_projects_controller(db)

@project_router.get("/{project_id}", response_model=ProjectRead)
async def get_project(project_id: int, db: AsyncSession = Depends(get_db)):
    return await fetch_project_by_id_controller(db, project_id)

@project_router.post("/", response_model=ProjectRead, status_code=201)
async def add_project(payload: ProjectCreate, db: AsyncSession = Depends(get_db)):
    return await create_project_controller(db, payload)

@project_router.put("/{project_id}", response_model=ProjectRead)
async def update_project(project_id: int, payload: ProjectUpdate, db: AsyncSession = Depends(get_db)):
    return await update_project_controller(db, project_id, payload)

@project_router.delete("/{project_id}", status_code=204)
async def remove_project(project_id: int, db: AsyncSession = Depends(get_db)):
    await delete_project_controller(db, project_id)