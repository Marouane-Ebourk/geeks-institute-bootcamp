# store a random paragraph
paragraph = """You can never know a single person fully, not even yourself. Even if you think you know yourself in your safe glass castle, you don't know yourself in the dirt. Even if you hustle and make it in the rough, you have no idea if you would thrive or die in the light of real riches, if your cleverness would outlive your desperation."""

# print out the number of characters
length = len(paragraph)
print (f"This paragraph contains {length} characters")

# print out the number of sentences
sentences_count = 0
for char in paragraph :
    if char == "." :
        sentences_count += 1
print(f"This paragraph contains {sentences_count} sentences")

# print out the number of words
word_count = len(paragraph.split())
print(f"This paragraph contains {word_count} words")


# print out how many unique words it contains.
# remove all punctuation
temp_paragraph = paragraph
for p in ['.', ',']:
    temp_paragraph = temp_paragraph.replace(p, ' ')

# convert to lower
temp_paragraph = temp_paragraph.lower()

# split into words
words = temp_paragraph.split()

# find unique words by converting into a set
unique_words = set(words)
unique_words_count = len(unique_words)

# print the amount
print(f"This paragraph contains {unique_words_count} unique words")

# print out how many non white space characters it contains
non_ws_chars_count = 0
for char in paragraph :
    if char not in [" ", "\n"] :
        non_ws_chars_count += 1
print(f"This paragraph contains {non_ws_chars_count} non-whitespace characters.")

# print out the average words per sentence in this paragraph
# split into sentences
sentences = []
sentence = ""
for char in paragraph :
    if char != "." :
        sentence += char
    else :
        sentences.append(sentence)
        sentence = ""

# split each sentence into words, and store how many for each one.
words_per_sentence_counts = []
for sentence in sentences :
    words_per_sentence_counts.append(len(sentence.split()))

# calculate the average
average = sum(words_per_sentence_counts) / len(words_per_sentence_counts)
print(f"This paragraph has an average of {average} words per sentence")


# print out the amount of non-unique words
# use the previous list of words
seen_words = set()
duplicate_words = set()

for word in words :
    if word in seen_words :
        duplicate_words.add(word)
    else :
        seen_words.add(word)
duplicate_words_count = len(duplicate_words)
print(f"This paragraph contains {duplicate_words_count} non-unique words.")