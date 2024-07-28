from fastapi import FastAPI
from .routes import memo, user

app = FastAPI()

app.include_router(memo.router, prefix="/memo", tags=["memo"])
app.include_router(user.router, prefix="/user", tags=["user"])

@app.get("/")
async def root():
    return {"message": "Hello World"}