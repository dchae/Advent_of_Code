from collections import deque
from itertools import chain, combinations

istestcase = True

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day12/exinput1.txt"
    )

else:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day12/input1.txt"
    )

connections = set()
smallcaves = set()
bigcaves = set()
starts = set()
ends = set()
with open(inputfilename) as inputfile:  # read input and initialise connections
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip().split("-")
        connections.add((line[0], line[1]))
        if line[0] == "start":
            starts.add((line[0], line[1]))
        if line[1] == "end":
            ends.add((line[0], line[1]))
        for cave in line:
            if len(cave) == 1:
                if cave.isupper():
                    bigcaves.add(cave)
                else:
                    smallcaves.add(cave)

print(connections)
print(bigcaves)
print(smallcaves)
print(starts)
print(ends)

paths = []
caves = bigcaves.union(smallcaves)
print(caves)


def powerset(caves):  # get set of all possible paths
    s = list(caves)
    return chain.from_iterable(combinations(s, r) for r in range(1, len(s) + 1))


pset = list(powerset(caves))
print("POWERSET:", pset)

# eliminate paths that are not valid
