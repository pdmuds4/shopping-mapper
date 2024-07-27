import supabase_client
from fastapi import HTTPException
from supabase import PostgrestAPIError

async def add_related_product(memo_id: int, new_product: str):
    """
    メモが完了済みでない場合に新しい製品を追加する。
    """
    try:
        async with supabase_client.SupabaseManager() as sbm:
            client = await sbm.get_client()
            # メモが完了済みかどうかを確認
            memo_resp = await client.table("memo").select("done").eq("id", memo_id).single().execute()
            if memo_resp.data and memo_resp.data['done']:
                raise HTTPException(status_code=400, detail={"message": "このメモはすでに完了済みです。製品を追加できません。"})
            # 製品を追加
            await client.table("product").insert({"memo_id": memo_id, "name": new_product}).execute()
    except PostgrestAPIError as e:
        raise HTTPException(status_code=500, detail={"message": "データベースエラーが発生しました。", "error": str(e)})

async def delete_product(product_id: int):
    """
    メモが完了済みでない場合に製品を削除する。
    """
    try:
        async with supabase_client.SupabaseManager() as sbm:
            client = await sbm.get_client()
            # product_idに基づいてmemo_idを取得
            product_resp = await client.table("product").select("memo_id").eq("id", product_id).single().execute()
            if not product_resp.data:
                raise HTTPException(status_code=404, detail={"message": "指定された製品が見つかりません。"})
            
            memo_id = product_resp.data['memo_id']
            # メモが完了済みかどうかを確認
            memo_resp = await client.table("memo").select("done").eq("id", memo_id).single().execute()
            if memo_resp.data and memo_resp.data['done']:
                raise HTTPException(status_code=400, detail={"message": "このメモはすでに完了済みです。製品を削除できません。"})
            # 製品を削除
            resp = await client.table("product").delete().eq("id", product_id).execute()
            return resp
    except PostgrestAPIError as e:
        raise HTTPException(status_code=500, detail={"message": "データベースエラーが発生しました。", "error": str(e)})
