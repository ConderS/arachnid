import csv
import json
from collections import OrderedDict

csvFile = open('../src/examples/sample_yelp.csv', 'r')
jsonFile = open('../src/examples/yelp.json', 'w')

entries = []

headers = ['business_id', 'name', 'neighborhood', 'address', 'city', 'state', 'postal_code', 'latitude', 'longitude', 'stars', 'review_count', 'is_open', 'categories']

reader = csv.DictReader( csvFile, headers )
for row in reader:
    entry = {}
    for header in headers:
            entry[header] = row[header]
    entries.append(entry)

json.dump(entries, jsonFile)
jsonFile.write('\n')