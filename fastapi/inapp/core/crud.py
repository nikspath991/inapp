from dotenv import load_dotenv
from sqlalchemy.orm import Session
from fastapi import  HTTPException, status
from inapp.db import models, schemas
from sqlalchemy import func
from inapp.dependancies import auth
from datetime import datetime, timedelta
import os

load_dotenv()

ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

def removespace(string):
    return string.replace(" ", "")

def get_movie_by_filters(db: Session, year: str = None, genre: str = None, person_name: str = None, title_type: str = None):
    query = db.query(models.MovieTitle)
    if year:
        query = query.filter(models.MovieTitle.startYear == year)
    if genre:
        query = query.filter(models.MovieTitle.genres.like(f'%{genre}%'))
    if title_type:
        query = query.filter(models.MovieTitle.titleType == title_type)
    if person_name:
        query = query.join(
            models.PersonName, models.PersonName.knownForTitles.like(
                '%' + models.MovieTitle.tconst + '%')
                ).filter(models.PersonName.primaryName == person_name)
    return query.all()

def get_person_by_filters(db: Session, movie_title: str = None, name: str = None, profession: str = None):
    query = db.query(models.PersonName)
    if name:
        query = query.filter(func.lower(models.PersonName.primaryName) == func.lower(name))
    if profession:
        query = query.filter(models.PersonName.primaryProfession.like(f'%{profession}%'))
    if movie_title:
        query = query.join(
            models.MovieTitle, models.PersonName.knownForTitles.like(
                '%' + models.MovieTitle.tconst + '%')
                ).filter(
                    models.MovieTitle.primaryTitle == movie_title)
    return query.all()


def register_user(db: Session, username: str , password: str):
    hashed_password = auth.get_password_hash(password)
    user = models.User(username=username, password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def login_user(db: Session , username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if not user or not auth.verify_password(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
