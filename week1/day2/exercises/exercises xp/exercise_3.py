brand = {
    "name": "Zara",
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}

# change the number of stores
brand["number_stores"] = 2

# print out zara's clients
sentence = "Zara's clients are : "
clients = brand["type_of_clothes"]
for client in clients :
    sentence += client 
    if clients.index(client) < len(clients) - 1 :
        sentence += ', '
    else :
        sentence += '.'
print(sentence)

# add a key called country_creation with a value of Spain.
brand["country_creation"] = "Spain"

# check if the key international_competitors is in the dictionary. 
# If it is, add the store Desigual.
if "international_competitors" in brand.keys():
    brand["international_competitors"].append("Desigual")

# delete date of creation
del brand["creation_date"]

# print the last international competitor
print("Last competitor:", brand["international_competitors"][-1])

# print the major colors in the US
print("Major colors in the US : ", brand["major_color"]["US"])

# print number of key-value pairs:
print("Total key-value pairs : ", len(brand.items()))

# print the keys of the dictionary.
print("Keys of the dictionary : ", list(brand.keys()))

# create another dictionary
more_on_zara = {
    "creation_date": 1975,
    "number_stores": 10000
}

# add information from more_on_zara to brand dictionary
brand.update(more_on_zara)

# print the value of the key number_stores. What just happened ?
print(brand["number_stores"])
#what happened is brand.update change the value of number_stores because this keyword already existed in brand
