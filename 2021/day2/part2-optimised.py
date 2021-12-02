horizontal_position = 0
depth = 0
aim = 0

with open(r"C:\github-dchae\Advent_of_Code\2021\day2\input1.txt") as inputfile:
    for line in inputfile:
        line = line.strip().split()
        line[1] = int(line[1])
        if line[0] == "forward":
            horizontal_position += line[1]
            depth += aim * line[1]
        if line[0] == "up":
            aim -= line[1]
        if line[0] == "down":
            aim += line[1]

print(horizontal_position * depth)
