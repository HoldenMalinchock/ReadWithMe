import requests
import json
import hashlib

isbn = '9780062380661'
isbn2 = '9780451474575'
response = requests.get('https://www.googleapis.com/books/v1/volumes?q=isbn:{}'.format(isbn))


ret = json.loads(response.text)

# parse = json.dumps(ret)
# print(type(parse))
print(ret['items'][0]['volumeInfo']['title'])
title = ret['items'][0]['volumeInfo']['title']
comb = title+isbn

md = hashlib.md5(comb.encode())
print(md.hexdigest())
