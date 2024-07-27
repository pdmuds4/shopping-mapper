import os
from supabase import acreate_client, AClient
from supabase.lib.client_options import ClientOptions
import structlog
import asyncio
from dotenv import load_dotenv
from typing import Optional

load_dotenv()
logger = structlog.get_logger()

class SupabaseManager:
    def __init__(self) -> None:
        self.__url: str = self._get_env_variable("SUPABASE_URL")
        self.__api_key: str = self._get_env_variable("SUPABASE_API_KEY")
        self._client: Optional[AClient] = None

    async def __aenter__(self) -> 'SupabaseManager':
        await self.initialize()
        return self

    async def __aexit__(self, exc_type, exc_value, traceback) -> any:
        await self.close_client()
        if exc_type:
            logger.error(f"At {__name__}: {exc_type.__name__}: {exc_value}")
            return False

    def _get_env_variable(self, key: str) -> str:
        value = os.getenv(key)
        if value is None:
            logger.error(f"Failed to load environment variable: {key}")
            raise ValueError(f"Environment variable {key} is missing")
        return value

    async def initialize(self) -> None:
        if self._client is None:
            try:
                options = ClientOptions(
                    schema="public",
                    headers={"x-my-custom-header": "my-app-name"},
                    auto_refresh_token=True,
                    persist_session=True
                )
                self._client = await acreate_client(
                    supabase_url=self.__url,
                    supabase_key=self.__api_key,
                    options=options
                )
            except Exception as e:
                logger.error("Failed to create Supabase client", error=str(e))
                raise

    async def get_client(self) -> AClient|None:
        if self._client is None:
            await self.initialize()
        return self._client

    async def close_client(self) -> None:
        if self._client:
            # ここでクライアントのクローズ処理を行う（必要に応じて）
            self._client = None

    def reset_client(self) -> None:
        self._client = None

# 使用例
async def main():
    try:
        async with SupabaseManager() as manager:
            client = await manager.get_client()
            # クライアントを使用した操作
            users = await client.table("user").select("*").execute()
            logger.info(users)
    except Exception as e:
        logger.error("An error occurred", error=str(e))

if __name__ == "__main__":
    asyncio.run(main())
