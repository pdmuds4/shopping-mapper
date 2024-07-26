from . import supabase_client
import structlog

logger = structlog.get_logger()

async def registUser(mail_addres: str, password: str) -> dict|False:
    """
    新しいユーザーを登録する。
    """
    try:
        async with supabase_client.SupabaseManager() as manager:
            db_client = await manager.get_client()
            response = await db_client.table("user").insert({"mail_addres": mail_addres, "password": password}).execute()
            return response.data
    except:
        return False
    
class UserClient:
    def __init__(self) -> None:
        pass

    async def find(self, mail_addres: str, password: str) -> list[dict, dict,]|False:
        """
        空のリストの場合は該当がなかったということ。
        """
        try:
            async with supabase_client.SupabaseManager() as manager:
                db_client = await manager.get_client()
                response = await db_client.table("user").select("id").eq("mail_addres", mail_addres).eq("password", password).execute()
                if len(response) > 0:
                    return response.data
                else:
                    return False
        except Exception as e:
            logger.error(e)
            raise

    async def updateUserData(self):
        pass

async def main():
    resp = await registUser("example12345@mail.com", "password123")
    if not resp:
        logger.info("同じメアドがすでに登録されています！")
        
    user_client = UserClient()
    try:
        user = await user_client.find("example12345@mail.com", "password123")
        print(user)
    except Exception as e:
        logger.error(e)
        print("Error in finding user")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())