from fastapi import FastAPI
from .routes import memo, user, product

app = FastAPI()

app.include_router(memo.router, prefix="/memo", tags=["memo"])
app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(product.router, prefix="/product", tags=["product"])

@app.get("/")
async def root():
    return {"message": "Hello World"}