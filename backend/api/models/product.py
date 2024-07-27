import supabase_client

async def add_related_product(user_id: int, memo_id: int, new_product:str):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        await client.table("product").insert({"memo_id":memo_id, "name":new_product})
