from . import supabase_client
import structlog
from supabase import PostgrestAPIError
from fastapi import HTTPException

logger = structlog.get_logger()

async def registUser(mail_address: str, password: str) -> int:
    """
    新しいユーザーを登録する。
    """
    try:
        async with supabase_client.SupabaseManager() as manager:
            db_client = await manager.get_client()
            response = await db_client.table("user").insert({"mail_address": mail_address, "password": password}).execute()
            return response.data[0]["id"]
    except PostgrestAPIError:
        raise HTTPException(status_code=400, detail={"message": "多分同じメアドがすでに登録されているっぽい…"})
    
    except Exception as e:
        raise HTTPException(status_code=400, detail={"message": f"予期せぬエラーってやつ…？あはは…:{e}"})
    
    
class UserClient:
    def __init__(self) -> None:
        pass

    async def find(self, mail_address: str, password: str):
        """
        空のリストの場合は該当がなかったということ。
        """
        try:
            async with supabase_client.SupabaseManager() as manager:
                db_client = await manager.get_client()
                response = await db_client.table("user").select("id").eq("mail_address", mail_address).eq("password", password).execute()
                if len(response.data) > 0:
                    return response.data[0]["id"]
                    
        except Exception:
            raise HTTPException(status_code=400, detail={"message" : "メアドかパスワードが間違えているか、そもそもまだ登録していないか…"})
    
    async def updateUserData(self):
        pass