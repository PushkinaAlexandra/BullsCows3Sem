import json

f = open("russian_nouns.txt", 'r', encoding='utf-8')
words = f.readlines()
rus_dict = {4: [], 5: []}
for word in words:
    word = word[:-1]
    if len(word) == 4 or len(word) == 5:
        rus_dict[len(word)].append(word)
print(rus_dict)
f.close()
f = open('rus_dict_4_5.txt', 'w', encoding='utf-8')
json_data = json.dumps(rus_dict)
print(json_data)
print(json_data, file = f)
print(type(json_data))
# headers = {
#     'Content-type': 'application/json',
#     'Accept': 'text/plain'
# }
# response = requests.post('http://localhost:3000', data=json.dumps(rus_dict), headers=headers)
