from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str
    
class UserOut(UserBase):
    id: int
    is_admin: bool

# book schmas
class BookBase(BaseModel):
    title: str
    description: Optional[str] = None

class BookCreate(BookBase):
    pass

class BookOut(BookBase):
    id: int
    owner: Optional[int]



# review schemas
class ReviewBase(BaseModel):
    review_text: str

class ReviewCreate(ReviewBase):
    pass

class ReviewOut(ReviewBase):
    id: int
    book_id: int
    user_id: int