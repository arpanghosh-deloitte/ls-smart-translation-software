from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.routers import api_router
from app.core.config import settings
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uvicorn
import logging
import os
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

load_dotenv(".env")
print("-------------------------", os.getenv("DATABASE_URL"))
app = FastAPI(
    title="Smart Translation",
    version="0.1", openapi_url="/openapi.json", 
    docs_url="/docs", 
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Customize for production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
# os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
# app.mount("/S3", StaticFiles(directory=settings.UPLOAD_DIR), name="S3")

app.include_router(api_router, prefix="/smart-translation")


if __name__ == "__main__":
    logger.info("App is Running ....")
    uvicorn.run("main:app", host="0.0.0.0", reload=True, port=8000)