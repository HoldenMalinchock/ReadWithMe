import requests

response = requests.get('https://www.googleapis.com/books/v1/volumes?q=isbn:9780062380661')
print(response.content)
print(type(response))