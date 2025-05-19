from fastapi import APIRouter, HTTPException, Request
from schemas import BookBase, BookOut, BookCreate
from database import get_connection
from typing import List, Optional  # Type hints
from psycopg2.extras import RealDictCursor  # Returns results as dictionaries instead of tuples


router = APIRouter()

# crud for books

# get books
@router.get("/books", response_model=List[BookBase])
def get_books():
    try:
        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute("select title, description from books;")
                books = cur.fetchall()  # Get all results
                return books

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving books: {str(e)}")



# create a book
@router.post("/books", response_model=BookOut)
def create_book(book: BookCreate, request: Request):
    print("\n\n\n")
    print(book)
    print("\n\n\n")
    try:
        user = request.state.user
        owner_id = user["user_id"]
        
        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                cur.execute(
                    """
                    insert into books (title, description, owner)
                    values (%s, %s, %s)
                    returning id, title, description, owner
                    """
                    , (book.title, book.description, owner_id)
                )
                db_book = cur.fetchone()
                conn.commit()
                return db_book

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating book: {str(e)}")



    return {"id": 1, "owner": 3, "title": "title1", "description": "desc1"}
