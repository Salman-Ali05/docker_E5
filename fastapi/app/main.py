from fastapi import FastAPI
from app.database.db import initialize_db

#importing routers
import app.routers.router_items

#api init (launch with uvicorn main:api --reload)
api = FastAPI( 
  title="Watches API",
  redoc_url='/'
)

@api.on_event("startup")
async def startup_event():
  initialize_db()

api.include_router(app.routers.router_items.router)