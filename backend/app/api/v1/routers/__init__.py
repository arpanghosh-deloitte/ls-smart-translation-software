from fastapi import APIRouter
from app.api.v1.routers.project_router import project_router
from app.api.v1.routers.package_router import package_router
from app.api.v1.routers.file_router import file_router
from app.db.init_db import db_init

db_init()

api_router = APIRouter()
api_router.include_router(project_router)
api_router.include_router(package_router)
api_router.include_router(file_router)