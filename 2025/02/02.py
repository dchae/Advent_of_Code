import re

f = open("exinput.txt", "r")
f = open("input.txt", "r")

line = f.read().strip().split(",")
ranges = [tuple(map(lambda x: int(x), s.split("-"))) for s in line]
# print(ranges)


def part1():
    res = sum(
        x
        for (start, end) in ranges
        for x in range(start, end + 1)
        if re.match(r"^(\d+)\1$", str(x))
    )

    print(f"part1: {res=}")


part1()


def part2():
    res = sum(
        x
        for (start, end) in ranges
        for x in range(start, end + 1)
        if re.match(r"^(\d+)\1+$", str(x))
    )
    print(f"part2: {res=}")


part2()
