import os
from pathlib import Path
from fastapi import UploadFile

from app.core.config import settings

# Simulate S3 bucket with a local folder
LOCAL_S3_ROOT = Path(settings.S3_LOCAL_DIRECTORY)

async def save_file_to_local_s3(package_id: int, file: UploadFile) -> str:
    """Save an uploaded file to local S3 and return its fake S3 key."""
    package_folder = LOCAL_S3_ROOT / f"package_{package_id}"
    os.makedirs(package_folder, exist_ok=True)
    file_location = package_folder / file.filename
    with open(file_location, "wb") as buffer:
        buffer.write(await file.read())
    # S3-style key (relative path from S3 root)
    return str(file_location.relative_to(LOCAL_S3_ROOT))

def delete_file_from_local_s3(s3_key: str) -> bool:
    """Delete a file given a local S3-key-style path."""
    file_path = LOCAL_S3_ROOT / s3_key
    if file_path.exists():
        file_path.unlink()
        return True
    return False

# --- AWS S3 placeholders; uncomment & fill credentials when ready ---
# import boto3
# s3_client = boto3.client('s3', aws_access_key_id=settings.AWS_ACCESS_KEY_ID, ...)
# async def save_file_to_s3(package_id, file):
#     s3_key = f"package_{package_id}/{file.filename}"
#     s3_client.upload_fileobj(file.file, settings.AWS_S3_BUCKET, s3_key)
#     return s3_key
# def delete_file_from_s3(s3_key):
#     s3_client.delete_object(Bucket=settings.AWS_S3_BUCKET, Key=s3_key)
#     return True