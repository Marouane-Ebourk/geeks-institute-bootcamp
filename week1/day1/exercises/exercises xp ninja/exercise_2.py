# Keep asking the user to input the longest sentence they can without the character “A”.
longest_sentence_length = 0
while True :
    sentence = input("\nGive me the longest sentence you can without using the character A :\n")
    if "a" in sentence.lower() :
        print("Sorry, this sentence contains 'A'");
    else :
        # Each time a user successfully sets a new longest sentence, print a congratulations message.
        if len(sentence) > longest_sentence_length :
            longest_sentence_length = len(sentence)
            print("Congratulations! This is the longest sentence you've written so far !")
