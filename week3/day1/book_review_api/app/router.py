
from fastapi import APIRouter


@router.get("/")
def test():
    print("test")