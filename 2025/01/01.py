# parsing
f = open("exinput.txt", "r")
f = open("input.txt", "r")

lines = f.read().strip().split("\n")
moves = [(1 if line[:1] == "R" else -1) * int(line[1::]) for line in lines]


def part1():
    dial, counter = 50, 0

    for move in moves:
        dial = (dial + move) % 100
        counter += dial == 0

    print(f"part1: {counter=}")


part1()


def part2():
    dial, counter = 50, 0

    for move in moves:
        for _ in range(abs(move)):
            step = 1 if move > 0 else -1
            dial = (dial + step) % 100
            counter += dial == 0

    print(f"part2: {counter=}")


part2()
