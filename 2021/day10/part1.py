from collections import deque

istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day10/exinput1.txt"
    )

else:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day10/input1.txt"
    )

inputdata = []
with open(inputfilename) as inputfile:  # read input and initialise inputdata
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip()
        inputdata.append(line)
# print(inputdata)

bracketdict = {
    "}": "{",
    ")": "(",
    "]": "[",
    ">": "<",
}  # dictionary


def find_illegal_char(line):  # if line is corrupted, returns first illegal character.
    openchunk = deque()  # stack of open brackets
    for char in line:
        if char in bracketdict.values():  # if char is an opening bracket, add to stack
            openchunk.append(char)
        elif char in bracketdict:  # if char is a closing bracket
            if (
                bracketdict[char] == openchunk[-1] and len(openchunk) > 0
            ):  # if char is correct closing bracket, pop from stack
                openchunk.pop()
            else:  # if char is illegal
                return char
    if len(openchunk) == 0:
        return True  # If line is complete, return True
    return False  # Else return False.


def syntax_checker(inputdata):
    illegal_chars = []
    for line in inputdata:
        output1 = find_illegal_char(line)
        if not isinstance(output1, bool):
            illegal_chars.append(output1)
    return illegal_chars


scorechart = {
    "}": 1197,
    ")": 3,
    "]": 57,
    ">": 25137,
}


def score(inputdata):
    total_score = 0
    illegal_chars = syntax_checker(inputdata)
    for char in illegal_chars:
        total_score += scorechart[char]
    return total_score


print("Illegal characters:", syntax_checker(inputdata))
print("Score:", score(inputdata))
