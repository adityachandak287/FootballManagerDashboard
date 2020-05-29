import os
import json

file_path = os.path.join(os.pardir, "data", "list.tsv")
json_path = os.path.join(os.pardir, "data", "countries.json")

raw_data = open(file_path).readlines()

master = {}

for line in raw_data[1:]:
    country, lat, lon, name = line.strip().split("\t")
    master[name.lower()] = {
        "code": country,
        "lat": lat,
        "lon": lon,
        "country": name
    }

with open(json_path, "w") as outfile:
    outfile.write(json.dumps(master, indent=4))
