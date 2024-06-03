from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from inapp.db import models, schemas
from inapp.core import crud
from inapp.dependancies import auth
from inapp.db.database import SessionLocal, engine
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
#John Belushi 1899 actor,miscellaneous,producer tt0072308,tt0050419,tt0053137,tt0027125
#short Carmencita  1894 Documentary,Short

# Create the database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



@app.get("/movies/", response_model=List[schemas.MovieBase])
def search_movies(year: str = None, genre: str = None, person_name: str = None, title_type: str = None, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    movies = crud.get_movie_by_filters(db, year, genre, person_name, title_type)
    return movies

@app.get("/persons/", response_model=List[schemas.PersonBase])
def search_persons(movie_title: str = None, name: str = None, profession: str = None, db: Session = Depends(get_db), current_user: schemas.User = Depends(auth.get_current_user)):
    persons = crud.get_person_by_filters(db, movie_title, name, profession)
    return persons

@app.post("/register/")
async def register(user: schemas.User, db: Session = Depends(get_db)):
    user = crud.register_user(db,user.username,user.password)
    return user

@app.post("/token/")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), 
                                 db: Session = Depends(get_db)):
    user = crud.login_user(db, form_data.username,form_data.password)
    return user
    