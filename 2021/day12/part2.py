istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day12\exinput1.txt"

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day12\input1.txt"

movesdict = {}
with open(inputfilename) as inputfile:  # read input and initialise connections
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip().split("-")
        if line[0] not in movesdict:
            movesdict[line[0]] = [line[1]]
        else:
            movesdict[line[0]].append(line[1])
        if line[1] not in movesdict:
            movesdict[line[1]] = [line[0]]
        else:
            movesdict[line[1]].append(line[0])
# print(movesdict)

# Depth First Search
paths = []
visits = {cave: 0 for cave in movesdict.keys()}

smallcaves = [
    x for x in movesdict.keys() if (x.islower() and x not in ["start", "end"])
]


def visitable(doublecave, visits, nextcave):  # returns bool
    if nextcave in ["start", "end"]:
        if visits[nextcave] > 0:
            return False
    elif nextcave in smallcaves:
        if visits[nextcave] > 0:  # if nextcave has been visited before
            if len(doublecave) >= 1:  # if doublecave has already been visited
                return False
            else:  # if doublecave is empty
                doublecave.append(nextcave)
                return True
    return True


def gen_paths(doublecave, visits, paths, path, movesdict, cave):
    path.append(cave)
    if cave not in visits:
        visits[cave] = 1
    else:
        visits[cave] += 1
    if cave == "end":
        paths.append(path[:])
    else:
        for nextcave in movesdict[cave]:
            if visitable(doublecave, visits, nextcave):
                gen_paths(doublecave, visits, paths, path, movesdict, nextcave)
    lastcave = path.pop()
    visits[lastcave] -= 1
    if lastcave in doublecave:
        doublecave.clear()


doublecave = []
gen_paths(doublecave, visits, paths, [], movesdict, "start")
print(len(paths))
for p in paths:
    for c in p:
        print(c, end="")
    print()
