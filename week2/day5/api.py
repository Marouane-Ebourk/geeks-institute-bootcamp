import os
import logging
import psycopg2
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
from contextlib import contextmanager