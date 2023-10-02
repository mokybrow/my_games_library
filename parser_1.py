import json
import requests


# with open('games.json', encoding='utf-8') as f:
#         data = json.loads(f.read())
#         for i in data['results']:
#                 print(i['name'], i['background_image'],i['slug'], i['released'], i['parent_platforms'])
                #print(i['parent_platforms'])
                # for j in i['parent_platforms']:
                #         print(i['name'], i['background_image'],i['slug'], i['released'],j['platform']['name'])
                #         #print(j['name'])


r = requests.get('https://api.rawg.io/api/games?key=1ae731eafea74e33907d89607c9483cb&page=1&page_size=50')
#print(r.json())
for i in r.json()['results']:
        print(i['name'], i['background_image'],i['slug'], i['released'], i['parent_platforms'])


# url = data['results'][0]['background_image']

# image_name = url.rpartition('/')[-1]  

# response = requests.get(url)

# if response.status_code ==200:
#         with open(f'{image_name}', 'wb') as file:
#                 file.write(response.content)
#                 print('es')


