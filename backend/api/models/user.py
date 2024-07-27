from . import supabase_client
import structlog
from supabase import PostgrestAPIError
from fastapi import HTTPException

logger = structlog.get_logger()

async def registUser(mail_addres: str, password: str) -> int:
    """
    新しいユーザーを登録する。
    """
    try:
        async with supabase_client.SupabaseManager() as manager:
            db_client = await manager.get_client()
            response = await db_client.table("user").insert({"mail_addres": mail_addres, "password": password}).execute()
            return response.data[0]["id"]
    except PostgrestAPIError:
        raise HTTPException(status_code=400, detail={"message": "多分同じメアドがすでに灯籠されているっぽい…"})
    
    except Exception as e:
        raise HTTPException(status_code=400, detail={"message": f"予期せぬエラーってやつ…？あはは…:{e}"})
    
    
class UserClient:
    def __init__(self) -> None:
        pass

    async def find(self, mail_addres: str, password: str):
        """
        空のリストの場合は該当がなかったということ。
        """
        try:
            async with supabase_client.SupabaseManager() as manager:
                db_client = await manager.get_client()
                response = await db_client.table("user").select("id").eq("mail_addres", mail_addres).eq("password", password).execute()
                if len(response.data) > 0:#>0としているけど、それが2以上になることはないはず
                    return response.data[0]["id"]
                    
        except Exception:
            raise HTTPException(status_code=400, detail={"message" : "メアドかパスワードが間違えているか、そもそもまだ登録していないか…"})

    async def updateUserData(self):
        pass

async def main():
    #resp = await registUser("example12345@mail.com", "password123")
        
    user_client = UserClient()
    user = await user_client.find("example12345@mail.com", "password123")
    if user:
        print(user)

    else:
        print("該当ユーザーなし")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())