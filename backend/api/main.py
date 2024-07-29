from fastapi import FastAPI, Depends, HTTPException, Security
from fastapi.security.api_key import APIKeyHeader
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from starlette.status import HTTP_403_FORBIDDEN
from fastapi.openapi.docs import get_swagger_ui_html, get_redoc_html
from fastapi.openapi.utils import get_openapi
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from .routes import memo, user, product

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = "nOe2YOhyCfzhqv78wnEEBKQy9powjshU"
API_KEY_NAME = "access_token"
DOCS_USERNAME = "muds2022"
DOCS_PASSWORD = "mIkzek-9dyrha-vobfyn"

api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)
security = HTTPBasic()

async def get_api_key(api_key_header: str = Security(api_key_header)):
    if api_key_header == API_KEY:
        return api_key_header
    else:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Could not validate credentials"
        )

async def verify_docs_credentials(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = credentials.username == DOCS_USERNAME
    correct_password = credentials.password == DOCS_PASSWORD
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Invalid credentials"
        )
    return credentials.username

app.include_router(memo.router, prefix="/memo", tags=["memo"])
app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(product.router, prefix="/product", tags=["product"])

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html(credentials: HTTPBasicCredentials = Depends(verify_docs_credentials)):
    return get_swagger_ui_html(openapi_url="/openapi.json", title="docs")

@app.get("/redoc", include_in_schema=False)
async def redoc_html(credentials: HTTPBasicCredentials = Depends(verify_docs_credentials)):
    return get_redoc_html(openapi_url="/openapi.json", title="ReDoc")

@app.get("/openapi.json", include_in_schema=False)
async def get_open_api_endpoint(credentials: HTTPBasicCredentials = Depends(verify_docs_credentials)):
    return JSONResponse(get_openapi(title="FastAPI", version="1.0.0", routes=app.routes))