from faker import Faker
from passlib.context import CryptContext
import mysql.connector


conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Crt@1234",
    database="inapp"
)
cur = conn.cursor()


fake = Faker()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def generate_fake_user():
    return {
        'name': fake.name(),
        'password' : pwd_context.hash(fake.name())
    }


fake_users = [generate_fake_user() for _ in range(10)]
for user in fake_users:
    cur.execute(
        """
        INSERT INTO users (username, password)
        VALUES (%s, %s)
        """,
        (user['name'], user['password'])
    )


print("Done")
conn.commit()
cur.close()
conn.close()    
