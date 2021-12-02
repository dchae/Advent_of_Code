inputdata = {}
with open(r"C:\github-dchae\Advent_of_Code\2021\day2\input1.txt") as inputfile:
    for line in inputfile:
        line = line.strip().split()
        inputdata[line[0]] = int(line[1])
print(inputdata)
