import supabase_client

async def add_related_product(user_id: int, memo_id: int, new_product:str):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        await client.table("product").insert({"memo_id":memo_id, "name":new_product})


async def delete_product(product_id: int):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 指定されたproduct_idに一致する製品を削除
        resp = await client.table("product").delete().eq("id", product_id).execute()
        return resp
    
async def update_product(product_id: int, new_data: dict):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 指定されたproduct_idに一致する製品をnew_dataで更新
        resp = await client.table("product").update(new_data).eq("id", product_id).execute()
        return resp
