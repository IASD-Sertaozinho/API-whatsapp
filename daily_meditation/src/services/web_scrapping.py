import re
from bs4 import BeautifulSoup
import requests

# Little test for getting the information from the website

# URL to scrape
url = 'https://mais.cpb.com.br/meditacao-da-mulher-2/'

# Fetch HTML content
response = requests.get(url)
html_content = response.text

# Parse HTML content
soup = BeautifulSoup(html_content, 'html.parser')

# Extract and print title
title = soup.find('div', class_='mdl-grid cpbCards')

image = soup.find('div', class_="mdl-card__media")
print(type(image))
stringImage = str(image)

pattern_url = r'url\((.*?)\)'

# Find all matches
matches = re.findall(pattern_url, stringImage)
image_link = matches[0]
print(matches[0])
# print("Title of the webpage:", title.get_text())
