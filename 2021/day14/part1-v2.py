from collections import Counter
import re

istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"2021/day14/exinput1.txt"

else:
    inputfilename = r"2021/day14/input1.txt"

insertions = {}
with open(inputfilename) as inputfile:
    lines = inputfile.readlines()
    template = lines[0].strip()
    for line in lines[2:]:
        line = line.strip().split(" -> ")
        insertions[line[0]] = line[1]


def generate_polymer(template, steplimit):
    re_target = f"({'|'.join(f'({x[0]})(?={x[1]})' for x in insertions.keys())})"
    for _ in range(steplimit):
        template = re.sub(
            re_target,
            lambda x: x.group() + insertions[template[x.start() : x.end() + 1]],
            template,
        )
    return template


def find_answer(template, steplimit):
    final_polymer = generate_polymer(template, steplimit)
    c = Counter(final_polymer).most_common()
    mostval, mostcount = c[0]
    leastval, leastcount = c[-1]
    print(f"Most Common Element: {mostval}, with {mostcount} occurences")
    print(f"Least Common Element: {leastval}, with {leastcount} occurences")
    print(f"Answer: {mostcount - leastcount}")


find_answer(template, 10)
