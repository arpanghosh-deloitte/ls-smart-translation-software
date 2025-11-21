from fastapi import HTTPException, status
from app.db import models
from app.core.security import hash_password, verify_password, create_access_token

def register_user(username: str, password: str):
    if username in models.users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    user = {
        "username": username,
        "hashed_password": hash_password(password),
    }
    models.users_db[username] = user
    return {"message": "User registered successfully"}

def login_user(username: str, password: str):
    user = models.users_db.get(username)
    if not user or not verify_password(password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": username})
    return {"access_token": token, "token_type": "bearer"}