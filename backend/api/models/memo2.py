from . import supabase_client
from supabase import PostgrestAPIError
from fastapi import HTTPException

async def getNotDoneMemo(user_id: str):
    """
    未完了のメモを取得する。ユーザーごとに一つしか未完了メモは持てないことを前提とする
    """
    try:
        async with supabase_client.SupabaseManager() as sbm:
            client = await sbm.get_client()
            resp = await client.table("memo").select("*").eq("user_id", user_id).eq("done", False).execute()
            if not resp.data:
                raise HTTPException(status_code=404, detail={"message": "未完了のメモが存在していないっぽい…？"})
            return resp.data
    except PostgrestAPIError as e:
        raise HTTPException(status_code=500, detail={"message": "データベースエラーが発生しました。", "error": str(e)})
    
async def getDoneMemo(user_id: str):
    """
    完了済みのメモを取得する。ユーザーごとに複数の完了済みメモを持つことができる。
    """
    try:
        async with supabase_client.SupabaseManager() as sbm:
            client = await sbm.get_client()
            resp = await client.table("memo").select("*").eq("user_id", user_id).eq("done", True).execute()
            if not resp.data:
                raise HTTPException(status_code=404, detail={"message": "完了済みのメモが存在していないっぽい…？"})
            return resp.data
    except PostgrestAPIError as e:
        raise HTTPException(status_code=500, detail={"message": "データベースエラーが発生しました。", "error": str(e)})

async def createNewMemo(user_id: int, title: str):
    """
    新たなメモを作成する。
    """
    try:
        async with supabase_client.SupabaseManager() as sbm:
            client = await sbm.get_client()
            # 未完了のメモが既に存在するか確認
            existing_memo_resp = await client.table("memo").select("id").eq("user_id", user_id).eq("done", False).execute()
            if existing_memo_resp.data:
                raise HTTPException(status_code=400, detail={"message": "未完了のメモが既に存在しています。新しいメモを作成できません。"})
            
            # 新しいメモを作成
            new_memo = {
                "user_id": user_id,
                "title": title,
                "done": False
            }
            resp = await client.table("memo").insert(new_memo).execute()
            return resp.data
    except PostgrestAPIError as e:
        raise HTTPException(status_code=500, detail={"message": "データベースエラーが発生しました。", "error": str(e)})
    
async def dropMemo(memo_id: int):
    """
    指定されたメモを削除する。
    """
    try:
        async with supabase_client.SupabaseManager() as sbm:
            client = await sbm.get_client()
            # メモが存在するか確認
            memo_resp = await client.table("memo").select("*").eq("id", memo_id).single().execute()
            if not memo_resp.data:
                raise HTTPException(status_code=404, detail={"message": "指定されたメモが見つかりません。"})
            
            # メモを削除
            resp = await client.table("memo").delete().eq("id", memo_id).execute()
            if resp.status_code != 200:
                raise HTTPException(status_code=500, detail={"message": "メモの削除に失敗しました。"})
            return {"message": "メモが削除されました。"}
    except PostgrestAPIError as e:
        raise HTTPException(status_code=500, detail={"message": "データベースエラーが発生しました。", "error": str(e)})
    
async def markUpMemo(memo_id: int):
    """
    メモを完了とする。ただし、関連された未購入の商品がある場合は弾く
    """
    try:
        async with supabase_client.SupabaseManager() as sbm:
            client = await sbm.get_client()
            # 未購入の商品が存在するか確認
            product_resp = await client.table("product").select("id").eq("memo_id", memo_id).eq("purchased", False).execute()
            if product_resp.data:
                raise HTTPException(status_code=400, detail={"message": "未購入の商品が存在します。メモを完了できません。"})
            
            # メモを完了にマーク
            resp = await client.table("memo").update({"done": True}).eq("id", memo_id).execute()
            if resp.status_code != 200:
                raise HTTPException(status_code=500, detail={"message": "メモの完了に失敗しました。"})
            return {"message": "メモが完了としてマークされました。"}
    except PostgrestAPIError as e:
        raise HTTPException(status_code=500, detail={"message": "データベースエラーが発生しました。", "error": str(e)})
    
async def markDownMemo(memo_id: int):
    """
    メモを未完了に書き換える。ただしすでに未完了のメモがある場合は弾く
    """
    try:
        async with supabase_client.SupabaseManager() as sbm:
            client = await sbm.get_client()
            # 他の未完了のメモが存在するか確認
            existing_memo_resp = await client.table("memo").select("id").eq("done", False).execute()
            if existing_memo_resp.data:
                raise HTTPException(status_code=400, detail={"message": "既に未完了のメモが存在します。メモを未完了にできません。"})
            
            # メモを未完了にマーク
            resp = await client.table("memo").update({"done": False}).eq("id", memo_id).execute()
            if resp.status_code != 200:
                raise HTTPException(status_code=500, detail={"message": "メモの未完了への書き換えに失敗しました。"})
            return {"message": "メモが未完了としてマークされました。"}
    except PostgrestAPIError as e:
        raise HTTPException(status_code=500, detail={"message": "データベースエラーが発生しました。", "error": str(e)})