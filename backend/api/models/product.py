from . import supabase_client
from fastapi import HTTPException
from supabase import PostgrestAPIError

# メモ内の商品のデータを取得
async def getProducts(memo_id: int):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 指定されたmemo_id内の商品のデータを全て取得
        product_id = await client.table("product").select("id").eq("memo_id", memo_id).execute()
        product_name = await client.table("product").select("name").eq("memo_id", memo_id).execute()
        product_is_buying = await client.table("product").select("is_done").eq("memo_id", memo_id).execute()
        product_day = await client.table("product").select("created_at").eq("memo_id", memo_id).execute()
        product_latitude = await client.table("product").select("latitude").eq("memo_id", memo_id).execute()
        product_longitude = await client.table("product").select("longitude").eq("memo_id", memo_id).execute()
        product_price = await client.table("product").select("price").eq("memo_id", memo_id).execute()
        # 商品のデータを辞書にまとめ、配列に格納
        products = []
        for id, name, is_buying, day, latitude, longitude, price in zip(product_id, product_name, product_is_buying, product_day, product_latitude, product_longitude, product_price):
            product_element = {**id, **name, **is_buying, **day, **latitude, **longitude, **price}
            products.append(product_element)

        return products

# 指定されたuser_idの未購入の商品を取得
async def getProductsFromUserID(user_id: int):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # memoテーブルから指定されたuser_idに対応するmemo_idを取得
        memo_ids = await client.table("memo").select("id").eq("user_id", user_id).execute()
        
        if not memo_ids.data:
            raise HTTPException(status_code=404, detail="No memos found for the given user_id")

        # 取得したmemo_idをもとに、未購入の商品を取得
        products = []
        for memo in memo_ids.data:
            memo_id = memo["id"]
            product_records = await client.table("product").select("*").eq("memo_id", memo_id).eq("is_done", False).execute()
            products.extend(product_records.data)
        
        return products

# 商品を登録
async def addRelatedProduct(memo_id: int, new_product: str):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 指定されたmemo_idに新しい商品を追加
        await client.table("product").insert({"memo_id":memo_id, "name":new_product})
        # インサートによって発行されたproduct_idを取得
        result_product_id = await client.table("product").select("id").eq("name", new_product).eq("memo_id", memo_id).execute()
        return result_product_id[0]

# 商品を削除
async def deleteProduct(product_id: int):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 削除する商品のidを取得
        result_product_id = await client.table("product").select("id").eq("id", product_id).execute()
        # 指定されたproduct_idに一致する商品を削除
        await client.table("product").delete().eq("id", product_id).execute()
        return result_product_id[0]
    
# 商品を購入済みに変更
async def updateAlreadyBuying(product_id: int, product_latitude: float, product_longitude: float, product_price: int):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 指定されたproduct_idに一致する商品を購入済みに変更し、緯度、経度、価格を更新
        await client.table("product").update({"is_done":True}).eq("id", product_id).execute()
        await client.table("product").update({"latitude":product_longitude}).eq("id", product_id).execute()
        await client.table("product").update({"longitude":product_longitude}).eq("id", product_id).execute()
        await client.table("product").update({"price":product_price}).eq("id", product_id).execute()
        # 更新された商品のidを取得
        result_product_id = await client.table("product").select("id").eq("id", product_id).execute()
        return result_product_id[0]
    
# 商品を未購入に変更
async def updateNotBuying(product_id: int):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 指定されたproduct_idに一致する商品を未購入に変更
        await client.table("product").update({"is_done":False}).eq("id", product_id).execute()
        # 更新された商品のidを取得
        result_product_id = await client.table("product").select("id").eq("id", product_id).execute()
        return result_product_id[0]
    
# 商品の名前を更新
async def updateName(product_id: int, new_data: str):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 指定されたproduct_idに一致する商品の名前をnew_dataで更新
        await client.table("product").update({"name":new_data}).eq("id", product_id).execute()
        # 更新された商品のidを取得
        result_product_id = await client.table("product").select("id").eq("id", product_id).execute()
        return result_product_id[0]

# 商品の価格を更新
async def updatePrice(product_id: int, new_price: int):
    async with supabase_client.SupabaseManager() as sbm:
        client = await sbm.get_client()
        # 指定されたproduct_idに一致する商品の価格をnew_priceを更新
        await client.table("product").update({"price":new_price}.eq("id", product_id).execute())
        # 更新された商品のidを取得
        result_product_id = await client.table("product").select("id").eq("id", product_id).execute()
        return result_product_id[0]
