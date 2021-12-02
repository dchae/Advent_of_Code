# if input is long list of two strings
inputdata = []
with open(r"C:\github-dchae\Advent_of_Code\2021\day3\input1.txt") as inputfile:
    for line in inputfile:
        line = line.strip().split()
        inputdata.append((line[0], int(line[1])))
print(inputdata)

# if input is long list of single strings
inputdata = []
with open("input1.txt") as inputfile:
    for line in inputfile:
        inputdata.append(int(line.strip()))

# remember, don't need to create list, if processing while reading file is possible
