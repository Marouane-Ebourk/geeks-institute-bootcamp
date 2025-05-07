morse_dict = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "(": "-.--.",
    ")": "-.--.-",
    ":": "---...",
    ";": "-.-.-.",
    '"': ".-..-.",
    " ": "/"
}

def text_to_morse(text):
    translated_morse = ""
    for char in text:
        char = char.upper()
        if char != " ":
            translated_morse += morse_dict.get(char, '') + ' ';
        else:
            translated_morse += "/ "
    print(translated_morse)

def morse_to_text(morse):
    chars = morse.strip().split(' ')
    translated_text = ""
    for char in chars:
        if char != "/":
            translated_text += list(morse_dict.keys())[list(morse_dict.values()).index(char)]
        else:
            translated_text += " "
    print(translated_text)
            


text_to_morse("hello world")
morse_to_text(".... . .-.. .-.. --- / .-- --- .-. .-.. -..")
