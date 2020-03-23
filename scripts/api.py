import requests
import json

response = requests.get('https://www.googleapis.com/books/v1/volumes?q=isbn:9780062380661')
print(response.content)
print(type(response))

ret = json.loads(response.text)

print(json.dumps(ret))