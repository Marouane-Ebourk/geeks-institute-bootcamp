import random

def throw_dice() :
    return random.randint(1, 6)

def throw_until_doubles():
    throws_count = 0
    while True:
        throws_count += 1
        num_1 = throw_dice()
        num_2 = throw_dice()
        if num_1 == num_2 :
            return throws_count

def main():
    # the total of throws
    total_throws_count = 0
    # a list to store the total of throws it took in each try
    throws_count_list = []
    for _ in range(100):
        double_throws_count = throw_until_doubles()
        throws_count_list.append(double_throws_count)
        total_throws_count += double_throws_count

    avg = sum(throws_count_list) / len(throws_count_list)
    rounded_avg = round(avg, 2)

    print(f"Total throws : {total_throws_count}")
    print(f"Average throws to reach doubles : {rounded_avg}")

main()