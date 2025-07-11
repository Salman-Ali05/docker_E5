from fastapi import APIRouter, HTTPException
from app.classes.models import Item, ItemNoId
from app.database.db import connect

router = APIRouter(
  prefix="/items"
)

@router.get("/", response_model=list[Item])
async def get_items ():
  conn = connect()
  cursor = conn.cursor()
  query = """
SELECT id, name, description
FROM items
"""
  cursor.execute(query)
  response = cursor.fetchall()
  conn.commit()
  conn.close()
  return (Item(id=id, name=name, description=description) for (id, name, description) in response)

@router.post("/")
async def post_items (item: ItemNoId):
  conn = connect()
  cursor = conn.cursor()
  query = """
INSERT INTO items (name, description)
VALUES (%s, %s)
"""
  values = [item.name, item.description]
  cursor.execute(query, values)
  conn.commit()
  conn.close()
  return cursor.lastrowid

@router.get("/{id}")
async def get_item_by_id(id: int):
  conn = connect()
  cursor = conn.cursor()
  query = """
SELECT id, name, description
FROM items
WHERE id=%s"""
  values = [id]
  cursor.execute(query, values)
  response = cursor.fetchall()
  conn.commit()
  conn.close()
  if not response : raise HTTPException(status_code=404, detail='item not found')
  return [Item(id=id, name=name, description=description) for (id, name, description) in response][0]