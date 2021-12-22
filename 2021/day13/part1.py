istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day13\exinput1.txt"

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day13\input1.txt"

dotmap = set()
folds = []
with open(inputfilename) as inputfile:  # read input and initialise map
    lines = inputfile.readlines()
    for line in lines:
        if line[0].isnumeric():  # if line starts with an integer
            line = [int(x) for x in line.strip().split(",")]
            dotmap.add(tuple(line))
        elif line[0].isalpha():
            line = line.strip().split("=")
            a = line[0][-1]
            b = int(line[1])
            folds.append((a, b))

# print("Dots:", dotmap)
print("Length:", len(dotmap))
print("Folds:", folds)


def fold(dotmap, f):
    if f[0] == "y":  # if folding up
        for dot in dotmap.copy():
            if dot[1] > f[1]:  # if dot in folded side
                newdot = (
                    dot[0],
                    dot[1] - (2 * (dot[1] - f[1])),
                )  # (original y) - 2*distance from fold
                dotmap.remove(dot)
                dotmap.add(newdot)
    if f[0] == "x":  # if folding left
        for dot in dotmap.copy():
            if dot[0] > f[1]:  # if dot in folded side
                newdot = (
                    dot[0] - 2 * (dot[0] - f[1]),
                    dot[1],
                )  # (original x) - 2*distance from fold
                dotmap.remove(dot)
                dotmap.add(newdot)


fold(dotmap, folds[0])
# fold(dotmap, folds[1])
print()
print("Length:", len(dotmap))
print("Dots:", dotmap)

