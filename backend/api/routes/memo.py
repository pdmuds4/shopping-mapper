from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from ..models import memo2

router = APIRouter()

# Pydanticモデル
class MemoCreate(BaseModel):
    user_id: int
    title: str

class MemoResponse(BaseModel):
    id: int
    created_at: str
    user_id: int
    title: str
    done: bool

class MemoUpdate(BaseModel):
    done: bool

@router.get("/not_done/{user_id}", response_model=List[MemoResponse])
async def get_not_done_memo(user_id: str):
    return await memo2.getNotDoneMemo(user_id)

@router.get("/done/{user_id}", response_model=List[MemoResponse])
async def get_done_memo(user_id: str):
    return await memo2.getDoneMemo(user_id)

@router.post("/", response_model=MemoResponse)
async def create_new_memo(memo_data: MemoCreate):
    return await memo2.createNewMemo(memo_data.user_id, memo_data.title)

@router.delete("/{memo_id}")
async def drop_memo(memo_id: int):
    return await memo2.dropMemo(memo_id)

@router.patch("/mark_up/{memo_id}")
async def mark_up_memo(memo_id: int):
    return await memo2.markUpMemo(memo_id)

@router.patch("/mark_down/{memo_id}")
async def mark_down_memo(memo_id: int):
    return await memo2.markDownMemo(memo_id)