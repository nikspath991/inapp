import pandas as pd
import mysql.connector
import os

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Crt@1234",
    database="inapp"
)
cur = conn.cursor()

current_directory = os.path.dirname(os.path.abspath(__file__))

print(f"Current directory: {current_directory}")

name_basics = os.path.join(current_directory, 'name.basics.tsv')


#Import Persons Data
# persons_pd = pd.read_csv(name_basics, sep='\t', na_values='\\N',low_memory=False)
# persons = persons_pd.head()
# persons = persons.where(pd.notnull(persons), None)

# persons = persons[['nconst', 'primaryName', 'birthYear', 'primaryProfession', 'knownForTitles']]

# print(persons)

# for _, row in persons.iterrows():
#     cur.execute(
#         """
#         INSERT INTO persons (nconst, primaryName, birthYear, primaryProfession, knownForTitles)
#         VALUES (%s, %s, %s, %s, %s)
#         """,
#         (row['nconst'], row['primaryName'], row['birthYear'], row['primaryProfession'], row['knownForTitles'])
#     )

# # Import Titles Data
titles_pd = pd.read_csv('title.basics.tsv', sep='\t', na_values='\\N', low_memory=False)
titles = titles_pd.head()
persons = titles.where(pd.notnull(titles), None)
titles = titles[['tconst', 'titleType', 'primaryTitle', 'startYear', 'genres']]
for _, row in titles.iterrows():
    cur.execute(
        """
        INSERT INTO titles (tconst, titleType, primaryTitle, startYear, genres)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (row['tconst'], row['titleType'], row['primaryTitle'], row['startYear'], row['genres'])
    )

#Commit and close connection
print("Done")
conn.commit()
cur.close()
conn.close()
