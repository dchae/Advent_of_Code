import re
from functools import cache

f = open("exinput.txt", "r")
f = open("input.txt", "r")

lines = f.read().strip().split("\n")
grid = [list(line) for line in lines]
print(grid)


def adjacent_positions(grid, x, y):
    for col in range(-1, 2):
        for row in range(-1, 2):
            if col == 0 and row == 0:
                continue
            px, py = x + col, y + row
            if py < 0 or py >= len(grid) or px < 0 or px >= len(grid[y]):
                val = "."
            else:
                val = grid[py][px]
            yield val, px, py


def part1():
    res = 0

    for y in range(len(grid)):
        for x in range(len(grid[y])):
            if grid[y][x] != "@":
                continue
            roll_count = 0
            for val, *_ in adjacent_positions(grid, x, y):
                if val == "@":
                    roll_count += 1
            if roll_count < 4:
                res += 1

    print(f"part1: {res=}")


part1()


def remove_rolls(grid):
    for y in range(len(grid)):
        for x in range(len(grid[y])):
            if grid[y][x] != "@":
                continue
            roll_count = 0
            for val, *_ in adjacent_positions(grid, x, y):
                if val == "@":
                    roll_count += 1
            if roll_count < 4:
                grid[y][x] = "x"

    removed = 0
    for y in range(len(grid)):
        for x in range(len(grid[y])):
            if grid[y][x] == "x":
                grid[y][x] = "."
                removed += 1

    return removed


def part2():
    res = 0
    while True:
        removed = remove_rolls(grid)
        if removed == 0:
            break
        res += removed

    print(f"part2: {res=}")


part2()
