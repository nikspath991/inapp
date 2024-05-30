from pydantic import BaseModel
from typing import List, Optional

class PersonBase(BaseModel):
    id: int
    nconst: str
    primaryName: str
    birthYear: Optional[int] = None
    primaryProfession: Optional[str] = None
    knownForTitles: Optional[str] = None

class PersonCreate(PersonBase):
    pass

class MovieBase(BaseModel):
    id: int
    tconst: str
    titleType: str
    primaryTitle: str
    startYear: Optional[int] = None
    genres: Optional[str] = None

class MovieCreate(MovieBase):
    pass

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str

class User(BaseModel):
    username: str
    password: str

