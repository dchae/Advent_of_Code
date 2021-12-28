from collections import deque

istestcase = True

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day14/exinput1.txt"
    )

else:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day14/input1.txt"
    )

insertions = {}
with open(inputfilename) as inputfile:
    lines = inputfile.readlines()
    template = deque([x for x in lines[0].strip()])
    for line in lines[2:]:
        line = line.strip().split(" -> ")
        insertions[(line[0][0], line[0][1])] = line[1]


def generate_polymer(polymer1, polymer2, step, steplimit):
    if step >= steplimit:
        return
    else:
        while len(polymer1) > 1:
            a = polymer1.popleft()
            c = polymer1[0]
            polymer2.append(a)
            if (a, c) in insertions:
                polymer2.append(insertions[(a, c)])
            else:
                polymer2.append(polymer1.popleft())
        polymer2.append(polymer1.popleft())
        step += 1
        generate_polymer(polymer2, polymer1, step, steplimit)


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
