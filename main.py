import json
import csv
from datetime import datetime, timedelta

MONTH = "2023-02"

f = open('data.json')
data = json.load(f)

result = {}
entries = []


def is_lunch_included(start, end):
    lunch_start = start.replace(hour=13)
    lunch_end = start.replace(hour=14)
    return start < lunch_start and end >= lunch_end

def parse_fields(e):
    title = e['title']
    is_lunch = title.startswith('Lunch')
    is_commit = title.startswith('Commit')
    start = e['start']
    end = e['end']
    if is_lunch or is_commit:
      return {}
    if not (start.startswith(MONTH) and end.startswith(MONTH)):
      return {}
    start_long = e['startLong'] / 1000
    end_long = e['endLong'] / 1000
    dt1 = datetime.fromtimestamp(start_long)
    dt2 = datetime.fromtimestamp(end_long)
    print(dt2)
    if is_lunch_included(start=dt1, end=dt2):
      print('removing 1h')
      dt2 = dt2 - timedelta(hours=1)
    print(dt2)
    duration = dt2 - dt1
    aco = title.split('-', 1)[0]

    e['startLong'] = start_long
    e['endLong'] = end_long
    e['aco'] = aco
    e['duration'] = str(duration)
    e['isCommit'] = is_commit
    e['isLunch'] = is_lunch

    return e

for e in data:
    e = parse_fields(e)
    if not e:
      continue
    entries.append(e)
f.close()

for e in entries:
  entry = {
    'title': e['title'],
    'duration': e['duration'],
    'start': e['start'],
    'end': e['end']
  }
  if e['aco'] not in result:
     result[e['aco']] = []
  result[e['aco']].append(entry)


fc = csv.writer(open('result.csv', 'w+', newline=''))

fc.writerow(['aco', 'title', 'duration', 'start', 'end'])
print(result)
for k, v in result.items():
    aco = k
    for entry in v:
       fc.writerow([aco, entry['title'], entry['duration'], entry['start'], entry['end']])

# print(result)
