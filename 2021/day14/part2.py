from collections import deque

istestcase = True

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"2021\day14\exinput1.txt"

else:
    inputfilename = r"2021\day14\input1.txt"

insertions = {}
with open(inputfilename) as inputfile:
    lines = inputfile.readlines()
    template = deque([x for x in lines[0].strip()])
    for line in lines[2:]:
        line = line.strip().split(" -> ")
        insertions[(line[0][0], line[0][1])] = line[1]

import re

def generate_polymer(polymer_template, steplimit):
    for _ in range(steplimit):
        re.sub(r"" polymer_template


def find_answer(template, steplimit):
    polymercache = {}
    while len(template) > 1:
        polymer2 = deque()
        step = 0
        pslice = deque([template.popleft(), template[0]])
        print(pslice)
        generate_polymer(template, polymer2, step, steplimit)
        if template:
            final_polymer = template
        else:
            final_polymer = polymer2

        counterdict = {}
        for x in final_polymer:
            if x not in counterdict:
                counterdict[x] = 1
            else:
                counterdict[x] += 1
        mostcommonvalue = max(counterdict, key=counterdict.get)
        leastcommonvalue = min(counterdict, key=counterdict.get)
        print(
            f"Most Common Element: {mostcommonvalue}, with {counterdict[mostcommonvalue]} occurences"
        )
        print(
            f"Least Common Element: {leastcommonvalue}, with {counterdict[leastcommonvalue]} occurences"
        )
    print(f"Answer: {counterdict[mostcommonvalue] - counterdict[leastcommonvalue]}")


find_answer(template, 10)
