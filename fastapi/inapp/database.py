from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus

password = 'Crt@1234'
quoted_password = quote_plus(password)
DATABASE_URL = f"mysql+mysqlconnector://root:{quoted_password}@localhost/inapp"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
