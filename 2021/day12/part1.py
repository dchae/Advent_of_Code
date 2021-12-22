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


def gen_paths(paths, path, movesdict, cave):
    path.append(cave)
    if cave == "end":
        paths.append(path[:])
    else:
        for nextcave in movesdict[cave]:
            if not (nextcave.islower() and nextcave in path):
                gen_paths(paths, path, movesdict, nextcave)
    path.pop()


gen_paths(paths, [], movesdict, "start")
print(len(paths))
# for p in paths:
#     print(p)
