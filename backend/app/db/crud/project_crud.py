from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from app.db.models.project_model import Project
from app.schemas.project_schema import ProjectCreate, ProjectUpdate
from fastapi import HTTPException, status

async def get_all_projects(db: AsyncSession):
    result = await db.execute(select(Project))
    return result.scalars().all()

async def get_project_by_id(db: AsyncSession, project_id: int):
    result = await db.execute(select(Project).where(Project.id == project_id))
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project

async def create_project(db: AsyncSession, project_in: ProjectCreate):
    project = Project(**project_in.dict())
    db.add(project)
    try:
        await db.commit()
        await db.refresh(project)
        return project
    except IntegrityError:
        await db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project name already exists")

async def update_project(db: AsyncSession, project_id: int, project_in: ProjectUpdate):
    project = await get_project_by_id(db, project_id)
    for var, value in project_in.dict(exclude_unset=True).items():
        setattr(project, var, value)
    await db.commit()
    await db.refresh(project)
    return project

async def delete_project(db: AsyncSession, project_id: int):
    project = await get_project_by_id(db, project_id)
    await db.delete(project)
    await db.commit()
    return None