import re
from functools import reduce

f = open("exinput.txt", "r")
f = open("input.txt", "r")


def part1():
    grid = [re.split(r"\s+", line.strip()) for line in f.read().strip().split("\n")]
    print(f"{grid=}")
    res = 0
    for col in range(len(grid[0])):
        op = grid[-1][col]
        print(f"{op=}")
        if op == "+":
            res += sum(int(grid[row][col]) for row in range(len(grid) - 1))
        else:
            res += reduce(
                lambda x, y: x * y,
                (int(grid[row][col]) for row in range(len(grid) - 1)),
            )

    print(f"part1: {res=}")


# part1()


def part2():
    # iterate through the grid by column
    # if the column is full spaces, we process it
    grid = [line for line in f.read().split("\n") if line]
    print(f"{grid=}")

    res = 0

    cur_nums = []
    cur_op = None
    for col in range(len(grid[0])):
        if all(grid[row][col] == " " for row in range(len(grid))):
            if cur_op == "+":
                solution = sum(cur_nums)
            elif cur_op == "*":
                solution = reduce(lambda x, y: x * y, cur_nums)
            else:
                raise ValueError("Unknown operator")

            res += solution
            cur_nums = []
            cur_op = None

        else:
            s = ""
            for row in range(len(grid)):
                if grid[row][col] == " ":
                    continue
                elif grid[row][col] == "+":
                    cur_op = "+"
                elif grid[row][col] == "*":
                    cur_op = "*"
                else:
                    s += grid[row][col]

            cur_nums.append(int(s))

    if cur_op == "+":
        solution = sum(cur_nums)
    elif cur_op == "*":
        solution = reduce(lambda x, y: x * y, cur_nums)
    else:
        raise ValueError("Unknown operator")

    res += solution

    print(f"part2: {res=}")


part2()
