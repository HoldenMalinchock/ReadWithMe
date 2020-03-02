import requests

response = requests.get('https://www.googleapis.com/books/v1/volumes?q=isbn:9780689835681')
print(response.content)
print(type(response))