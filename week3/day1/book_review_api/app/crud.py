from fastapi import APIRouter, HTTPException, Request, Depends
from schemas import BookBase, BookOut, BookCreate
from database import get_connection
from typing import List, Optional  # Type hints
from psycopg2.extras import RealDictCursor  # Returns results as dictionaries instead of tuples
from dependencies import require_admin


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

# update a book (owner/admin)

@router.put("/books/{book_id}")
def update_book(book_id: int, user=Depends(require_admin)):
    try:

        with get_connection() as conn:
            with conn.cursor(cursor_factory=RealDictCursor) as cur:
                # TODO
                cur.execute(
                    """
                    select id
                    """
                )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error while updating the book")

