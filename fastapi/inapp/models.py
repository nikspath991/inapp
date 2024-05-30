from sqlalchemy import Column, Integer, String, Table, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class PersonName(Base):
    __tablename__ = 'persons'
    id = Column(Integer, primary_key=True)
    nconst = Column(String)
    primaryName = Column(String)
    birthYear = Column(String)
    primaryProfession = Column(String)
    knownForTitles = Column(String)

class MovieTitle(Base):
    __tablename__ = 'titles'
    id = Column(Integer, primary_key=True)
    tconst = Column(String)
    titleType = Column(String)
    primaryTitle = Column(String)
    startYear = Column(String)
    genres = Column(String)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)    


 
