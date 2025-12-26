import re
from functools import cache

f = open("exinput.txt", "r")
f = open("input.txt", "r")

lines = f.read().strip().split("\n")
banks = [[int(c) for c in line] for line in lines]
print(banks)


def part1():
    def find_largest_joltage(bank: list[int]):
        i = 0
        for k in range(1, len(bank) - 1):
            if bank[k] > bank[i]:
                i = k

        j = i + 1
        for k in range(j + 1, len(bank)):
            if bank[k] > bank[j]:
                j = k

        return bank[i] * 10 + bank[j]

    res = sum(find_largest_joltage(bank) for bank in banks)

    print(f"part1: {res=}")


part1()


# find the largest 12-digit number we can make from the array of numbers
# The largest n-digit number starts with the first instance of the largest number that leaves at least n-1 digits left
# This is true recursively
def find_idx_first_max(nums: list[int]):
    best = 0
    for i in range(len(nums)):
        if nums[i] > nums[best]:
            best = i
    return best


def part2():
    def find_largest_joltage(bank: list[int], count=12) -> int:
        if count == 1:
            return max(bank)

        i = find_idx_first_max(bank[0 : -count + 1])
        res = int(f"{bank[i]}{find_largest_joltage(bank[i + 1 :], count - 1)}")
        return res

    res = sum(find_largest_joltage(bank) for bank in banks)
    print(f"part2: {res=}")


part2()
