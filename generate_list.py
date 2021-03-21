import requests
import re
import json
from bs4 import BeautifulSoup


def pageExists(index):
    r = requests.get(f'https://gogoanime.vc/anime-list.html?page={index}')
    soup = BeautifulSoup(r.text, 'html.parser')
    soup = soup.select('ul.listing > li')
    if not soup:
        return False
    return True


regex = r"\<li title='\<div class=\"thumnail_tool\"\>.*\<\/div\>\'\>\n.*?\<a href\=\"(.*?)\""

ALL_ANIME = []
page = 1
while True:
    r = requests.get(f'https://gogoanime.vc/anime-list.html?page={page}').text
    soup = BeautifulSoup(r, 'html.parser')
    soup = soup.select('ul.listing > li')
    if not soup:
        break
    ALL_ANIME.extend(list(re.findall(regex, r)))
    page += 1


with open('all_anime.json', 'w') as f:
    json.dump(ALL_ANIME, f, indent=4)
