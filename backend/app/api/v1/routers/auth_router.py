from fastapi import APIRouter
from app.schemas.auth_schema import UserRegister, UserLogin, Token
from app.api.v1.controllers import auth_controller

router = APIRouter(prefix="/api/auth", tags=["auth"])

@router.post("/register")
def register(payload: UserRegister):
    return auth_controller.register_user(payload.username, payload.password)

@router.post("/login", response_model=Token)
def login(payload: UserLogin):
    return auth_controller.login_user(payload.username, payload.password)