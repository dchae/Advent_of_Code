from collections import deque
from numpy import median

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


def complete_line(
    line,
):  # if line is incomplete, returns needed brackets to complete line.
    openchunk = deque()  # stack of open brackets
    for char in line:
        if char in bracketdict.values():  # if char is an opening bracket, add to stack
            openchunk.append(char)
        elif char in bracketdict:  # if char is a closing bracket
            if (
                bracketdict[char] == openchunk[-1] and len(openchunk) > 0
            ):  # if char is correct closing bracket, pop from stack
                openchunk.pop()
            else:  # if char is illegal, returns False
                return False
    if len(openchunk) > 0:
        result = []
        for x in openchunk:
            for closingbracket, openingbracket in bracketdict.items():
                if openingbracket == x:
                    result.insert(0, closingbracket)
        return result
    return False  # If line is complete, return False.


def find_completionstrings(inputdata):
    completionstrings = []
    for line in inputdata:
        output1 = complete_line(line)
        if not isinstance(output1, bool):
            completionstrings.append(output1)
    return completionstrings


scorechart = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
}


def gen_scorelist(inputdata):
    scorelist = []
    for string in find_completionstrings(inputdata):
        score = 0
        for char in string:
            score *= 5
            score += scorechart[char]
        scorelist.append(score)
    return scorelist


def find_med_score(inputdata):
    return median(gen_scorelist(inputdata))


print("Completion Strings:", find_completionstrings(inputdata))
print(gen_scorelist(inputdata))
print(find_med_score(inputdata))
