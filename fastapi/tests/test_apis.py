from fastapi.testclient import TestClient
from inapp.main import app

client = TestClient(app)

def user_login():
    return client.post("/token",
                           data={"username":"admin","password":"admin"},)
    

def test_login_user():
    response = user_login()
    assert response.status_code == 200
    user_data = response.json()
    assert user_data["username"] == "admin"
    

def test_movies_api():
    response = client.get("/movies")
    print(response.json())
    assert response.status_code == 401

def test_movies_api_with_no_error():
    response = user_login()
    user_data = response.json()
    token = user_data['access_token']
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/movies", headers=headers)
    assert response.status_code == 200

def test_movies_api_with_filter():
    response = user_login()
    user_data = response.json()
    token = user_data['access_token']
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/movies/?year=1894", headers=headers)
    assert response.status_code == 200
    movies = response.json()
    assert len(movies) == 1
    assert movies[0]['startYear'] == 1894

def test_persons_api():
    response = client.get("/persons")
    print(response.json())
    assert response.status_code == 401

def test_persons_api_with_no_error():
    response = user_login()
    user_data = response.json()
    token = user_data['access_token']
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/persons", headers=headers)
    assert response.status_code == 200    

def test_persons_api_with_filter():
    response = user_login()
    user_data = response.json()
    token = user_data['access_token']
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/persons/?name=John%20Belushi", headers=headers)
    assert response.status_code == 200
    persons = response.json()
    assert len(persons) == 1
    assert persons[0]['primaryName'] == 'John Belushi'





    