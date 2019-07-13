import datetime
# import logging
from datetime import timedelta, time
from pymongo import MongoClient, InsertOne
from bson.objectid import ObjectId
# from logging.handlers import TimedRotatingFileHandler
import csv

class insertPosts:

    def __init__(self):
        # Database
        self.client = MongoClient('178.128.102.29',27017)
        self.client.mern.authenticate('will', 'Methane1')
        self.db = self.client.mern
        self.PostsCollection = self.db.posts

    def read(self):
        # posts = [
        # {'username': 'Ben','email': 'Ben@gmail.com'},
        # {'username': 'Sam','email': 'Sam@gmail.com'}
        # ]
        with open('posts.csv', 'r', encoding='utf-8-sig') as f:
            sheet = csv.reader(f)
            for row in sheet:
                cities.append({
                'name': row[0],
                })
        return posts

    def insert(self, posts):
        requests = []
        counts = 0
        print(posts)
        for post in posts:
            requests.append(InsertOne(post))
            if len(requests) == 500:
                result = self.PostsCollection.bulk_write(requests)
                print("500 executed")
                counts += 1
                requests = []

        if len(requests) > 0:
            result = self.PostsCollection.bulk_write(requests)
            counts += 1
            print("done!")

        print(counts)



if __name__ == '__main__':
    insertPosts = insertPosts()
    data = insertPosts.read()
    insertPosts.insert(data)
