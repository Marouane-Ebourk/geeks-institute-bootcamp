data = [
    {
        "question": "What is Baby Yoda's real name?",
        "answer": "Grogu"
    },
    {
        "question": "Where did Obi-Wan take Luke after his birth?",
        "answer": "Tatooine"
    },
    {
        "question": "What year did the first Star Wars movie come out?",
        "answer": "1977"
    },
    {
        "question": "Who built C-3PO?",
        "answer": "Anakin Skywalker"
    },
    {
        "question": "Anakin Skywalker grew up to be who?",
        "answer": "Darth Vader"
    },
    {
        "question": "What species is Chewbacca?",
        "answer": "Wookiee"
    }
]

correct_answers_count = 0
wrong_answers_count = 0
wrong_answers = []

def quiz() :
    global correct_answers_count
    global wrong_answers_count 
    global wrong_answers
    # reset whenever rerunning the quiz
    correct_answers_count, wrong_answers_count = 0, 0

    wrong_answers = []

    for item in data :
        # replay the quiz if the user reaches three wrong answers
        if wrong_answers_count == 3 :
            print("play again")
            quiz()

        question = item["question"]
        answer = item["answer"]

        user_answer = input(question + ' ')

        if user_answer.lower() == answer.lower():
            correct_answers_count += 1
        else :
            print("your answer    :", user_answer)
            print("correct answer :", answer)
            wrong_answers.append(user_answer)
            wrong_answers_count += 1

# print out the results of the quiz
def show_results() :
    print(f"\nyou have {correct_answers_count} correct answers, and {wrong_answers_count} wrong answers")
        
quiz()
show_results()