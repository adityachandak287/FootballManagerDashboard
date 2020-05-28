from pymongo import MongoClient
import json
client = MongoClient("mongodb://localhost:27017")

db = client.fifa
statsCollection = db.stats

playerData = list(statsCollection.find({"Club": "FC Barcelona"}))

for player in playerData:
    with open("player.json", "w") as outfile:
        del player["_id"]
        outfile.write(json.dumps(player, indent=4))
        print("JSON saved")
    break
