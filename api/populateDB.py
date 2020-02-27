from pymongo import MongoClient
import json
client = MongoClient("mongodb://localhost:27017")

db = client.fifa
statsCollection = db.stats

playerData = list(statsCollection.find({"Club": "FC Barcelona"}))

for player in playerData:
    print(player)
    break
