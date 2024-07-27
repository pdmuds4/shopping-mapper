from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..models import user

router = APIRouter()

# Pydanticモデル
class UserCreate(BaseModel):
    mail_address: str
    password: str

class UserLogin(BaseModel):
    mail_address: str
    password: str

class UserResponse(BaseModel):
    id: int

@router.post("/register", response_model=UserResponse)
async def register_user(user_data: UserCreate):
    user_id = await user.registUser(user_data.mail_address, user_data.password)
    return {"id": user_id}

@router.post("/login", response_model=UserResponse)
async def login_user(user_data: UserLogin):
    user_client = user.UserClient()
    user_id = await user_client.find(user_data.mail_address, user_data.password)
    if user_id:
        return {"id": user_id}
    else:
        raise HTTPException(status_code=400, detail={"message": "メアドかパスワードが間違えています。"})

# エンドポイントの追加が必要な場合、ここに追加してください