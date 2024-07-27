import supabase_client

async def create_memo(
        user_id: int,
        title: str,
        related_products: list[dict, dict,],
        done: bool = False,
):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()

        # インサートするデータを辞書形式で準備
        data = {
            "user_id": user_id,
            "title": title,
            "done": done
        }
        # データベースにインサート
        resp = await client.table("memo").insert(data).execute()
        memo_id = resp.data[0]["id"]

        async def insert_products(related_products: list):
            for product in related_products:
                product["memo_id"] = memo_id
                await client.table("product").insert(product).execute()

        await insert_products(related_products)
    

items = [{"name":"冷やし豆腐"}, {"name":"るーろーはん"}]

async def test():
    await create_memo(1, "ちわっす", items)

import asyncio
asyncio.run(test())