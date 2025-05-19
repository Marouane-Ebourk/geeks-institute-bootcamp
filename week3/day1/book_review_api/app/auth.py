from fastapi import HTTPException, Depends
from passlib.context import CryptContext
from jose import jwt
# from datetime import datetime, timedelta
from schemas import UserCreate, UserOut
from database import get_connection
from fastapi import APIRouter
import os

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "secretkey")
ALGORITHM = os.getenv("ENC_ALGO", "HS256")
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password):
    return pwd_context.hash(password)

# verify the password using our context
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


# create token for our user
def create_access_token(data, expires_delta = None):
    # to_encode = data.copy()
    # expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    # to_encode.update({"exp": expire})
    # return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/signup", response_model=UserOut)
def signup(user: UserCreate):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("select id from users where username=%s", (user.username,))
            if cur.fetchone():
                raise HTTPException(status_code=400, detail="Username already exists")
            hashed_pw = hash_password(user.password)
            cur.execute(
                """insert into users (username, password)
                    values (%s, %s)
                    returning id, username, is_admin;
                """,
                (user.username, hashed_pw)
            )
            db_user = cur.fetchone()
            conn.commit()
            return {"id": db_user[0], "username": db_user[1], "is_admin": db_user[2]}

@router.post("/login")
def login(user: UserCreate):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("select id, username, password, is_admin from users where username=%s", (user.username,))
            db_user = cur.fetchone()
            if not db_user or not verify_password(user.password, db_user[2]):
                raise HTTPException(status_code=401, detail="Invalid credentials")

            token = create_access_token({"sub": db_user[1], "user_id": db_user[0], "is_admin": db_user[3]})
            return {"access_token": token, "token_type": "bearer"}