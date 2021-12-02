inputdata = []
with open(r"C:\github-dchae\Advent_of_Code\2021\day2\input1.txt") as inputfile:
    for line in inputfile:
        line = line.strip().split()
        inputdata.append((line[0], int(line[1])))
print(inputdata)

horizontal_position = 0
depth = 0
aim = 0
for movement in inputdata:
    if movement[0] == "forward":
        horizontal_position += movement[1]
        depth += aim * movement[1]
    if movement[0] == "up":
        aim -= movement[1]
    if movement[0] == "down":
        aim += movement[1]

print(horizontal_position * depth)
