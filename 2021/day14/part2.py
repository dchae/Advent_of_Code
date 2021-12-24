from collections import deque

istestcase = True

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day14\exinput1.txt"

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day14\input1.txt"

insertions = {}
with open(inputfilename) as inputfile:
    lines = inputfile.readlines()
    template = deque([x for x in lines[0].strip()])
    for line in lines[2:]:
        line = line.strip().split(" -> ")
        insertions[(line[0][0], line[0][1])] = line[1]


# instead of generating the actual polymer, find a way to predict the counts of letters
