import datetime
# import logging
from datetime import timedelta, time
from pymongo import MongoClient, InsertOne
from bson.objectid import ObjectId
# from logging.handlers import TimedRotatingFileHandler
import csv

class insertCities:

    def __init__(self):
        # Database
        self.client = MongoClient('localhost',27017)
        self.client.mern.authenticate('will', 'Methane1')
        self.db = self.client.mern
        self.UsersCollection = self.db.users

    def read(self):
        # users = [
        # {'username': 'Ben','email': 'Ben@gmail.com'},
        # {'username': 'Sam','email': 'Sam@gmail.com'}
        # ]
        # with open('cities.csv', 'r', encoding='utf-8-sig') as f:
        #     sheet = csv.reader(f)
        #     for row in sheet:
        #         cities.append({
        #         'name': row[0],
        #         })
        return users

    def insert(self, users):
        requests = []
        counts = 0
        print(users)
        for user in users:
            requests.append(InsertOne(user))
            if len(requests) == 500:
                result = self.UsersCollection.bulk_write(requests)
                print("500 executed")
                counts += 1
                requests = []

        if len(requests) > 0:
            result = self.UsersCollection.bulk_write(requests)
            counts += 1
            print("done!")

        print(counts)



if __name__ == '__main__':
    insertCities = insertCities()
    data = insertCities.read()
    insertCities.insert(data)
