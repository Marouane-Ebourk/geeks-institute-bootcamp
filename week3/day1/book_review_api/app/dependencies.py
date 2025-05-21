from fastapi import Request, HTTPException

def require_admin(request: Request):
    user = getattr(request.state, "user", None)
    if not user or not user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user