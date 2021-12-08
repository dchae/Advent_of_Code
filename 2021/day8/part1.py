istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day8\exinput1.txt"

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day8\input1.txt"

signalpatterns = []
outputvalues = []
with open(
    inputfilename
) as inputfile:  # read input and initialise signalpatterns, outputvalues
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip().split(" | ")
        signalpatterns.append(line[0].split(" "))
        outputvalues.append(line[1].split(" "))
print(signalpatterns)
print(outputvalues)

# 1 needs 2 digits, 4:4, 7:3, 8:7
def count1478(outputvalues):
    count = 0
    for row in outputvalues:
        for out_val in row:
            if len(out_val) == 2:  # if 1
                count += 1
            if len(out_val) == 4:  # if 4
                count += 1
            if len(out_val) == 3:  # if 7
                count += 1
            if len(out_val) == 7:  # if 8
                count += 1
    return count


print(count1478(outputvalues))
