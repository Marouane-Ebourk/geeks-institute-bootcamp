from fastapi import FastAPI
from database import create_tables
from middleware import AuthMiddleware
from auth import router as auth_router
from crud import router as crud_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(crud_router)

app.add_middleware(AuthMiddleware)

@app.on_event("startup")
async def on_startup():
    create_tables()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", reload=True)