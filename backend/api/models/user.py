from . import supabase_client
import structlog
from supabase import PostgrestAPIError
from fastapi import HTTPException
import bcrypt

logger = structlog.get_logger()

def hash_password(password: str) -> str:
    # bcryptを使ってパスワードをハッシュ化
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    # パスワードが一致するかを確認
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

async def registUser(mail_address: str, password: str) -> int:
    """
    新しいユーザーを登録する。
    """
    try:
        hashed_password = hash_password(password)  # パスワードをハッシュ化
        async with supabase_client.SupabaseManager() as manager:
            db_client = await manager.get_client()
            response = await db_client.table("user").insert({"mail_address": mail_address, "password": hashed_password}).execute()
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
                response = await db_client.table("user").select("id", "password").eq("mail_address", mail_address).execute()
                if len(response.data) > 0:
                    hashed_password = response.data[0]["password"]
                    if verify_password(password, hashed_password):
                        return response.data[0]["id"]
                    
        except Exception:
            raise HTTPException(status_code=400, detail={"message" : "メアドかパスワードが間違えているか、そもそもまだ登録していないか…"})

    async def updateUserData(self):
        pass

async def main():
    resp = await registUser("example123456789@mail.com", "password12345")
        
    user_client = UserClient()
    user = await user_client.find("example123456789@mail.com", "password12345")
    if user:
        print(user)

    else:
        print("該当ユーザーなし")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())