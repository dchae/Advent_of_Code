istestcase = True

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
            line = line.strip().split(",")
            dotmap.add(tuple(line))
        elif line[0].isalpha():
            l = [char for char in line if (char in ["x", "y"] or char.isnumeric())]
            folds.append(tuple(l))

print("Dots:", dotmap)
print("Folds:", folds)
