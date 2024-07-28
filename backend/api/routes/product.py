## api/models/routes/products.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ..models import product

router = APIRouter()

# Pydanticモデル
class ProductCreate(BaseModel):
    memo_id: int
    name: str

class ProductUpdate(BaseModel):
    product_id: int
    latitude: float
    longitude: float
    price: int

class ProductNameUpdate(BaseModel):
    product_id: int
    new_name: str

class ProductPriceUpdate(BaseModel):
    product_id: int
    new_price: int

class ProductResponse(BaseModel):
    id: int
    memo_id: int
    name: str
    is_done: bool
    created_at: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    price: Optional[int] = None

@router.get("/{memo_id}", response_model=List[ProductResponse])
async def get_products(memo_id: int):
    return await product.getProducts(memo_id)

@router.get("/user/{user_id}", response_model=List[ProductResponse])
async def get_products_from_user_id(user_id: int):
    try:
        return await product.getProductsFromUserID(user_id)
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=e.detail)

@router.post("/", response_model=int)
async def add_related_product(products: ProductCreate):
    return await product.addRelatedProduct(products.memo_id, products.name)

@router.delete("/{product_id}", response_model=int)
async def delete_product(product_id: int):
    return await product.deleteProduct(product_id)

@router.patch("/mark_done", response_model=int)
async def update_already_buying(products: ProductUpdate):
    return await product.updateAlreadyBuying(products.product_id, products.latitude, products.longitude, products.price)

@router.patch("/mark_not_done/{product_id}", response_model=int)
async def update_not_buying(product_id: int):
    return await product.updateNotBuying(product_id)

@router.patch("/update_name", response_model=int)
async def update_name(products: ProductNameUpdate):
    return await product.updateName(products.product_id, products.new_name)

@router.patch("/update_price", response_model=int)
async def update_price(products: ProductPriceUpdate):
    return await product.updatePrice(products.product_id, products.new_price)