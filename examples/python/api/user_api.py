from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class UserCreate(BaseModel):
    username: str
    email: str
    full_name: Optional[str] = None

class User(UserCreate):
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True

# In-memory database for example
users_db = []
user_id_counter = 1

@router.post("/users/", response_model=User, status_code=201)
async def create_user(user: UserCreate):
    global user_id_counter
    
    # Check if username already exists
    if any(u["username"] == user.username for u in users_db):
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Create new user
    new_user = {
        "id": user_id_counter,
        "username": user.username,
        "email": user.email,
        "full_name": user.full_name,
        "created_at": datetime.now()
    }
    
    users_db.append(new_user)
    user_id_counter += 1
    
    return new_user

@router.get("/users/", response_model=List[User])
async def get_users(skip: int = 0, limit: int = 100):
    return users_db[skip : skip + limit]

@router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    for user in users_db:
        if user["id"] == user_id:
            return user
    
    raise HTTPException(status_code=404, detail="User not found")
