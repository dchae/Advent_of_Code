istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day9\exinput1.txt"

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day9\input1.txt"

inputdata = []
with open(inputfilename) as inputfile:  # read input and initialise inputdata
    lines = inputfile.readlines()
    for line in lines:
        nums = []
        line = line.strip()
        for num in line:
            nums.append(int(num))
        inputdata.append(nums)
for x in inputdata:
    print(x)


def find_lowpoints(inputdata):
    lowpoints = []
    for row in range(len(inputdata)):
        for cell in range(len(inputdata[0])):
            adjacents = []
            if cell > 0:
                adjacents.append(inputdata[row][cell - 1])
            if cell < len(inputdata[row]) - 1:  # -2?
                adjacents.append(inputdata[row][cell + 1])
            if row > 0:
                adjacents.append(inputdata[row - 1][cell])
            if row < len(inputdata) - 1:
                adjacents.append(inputdata[row + 1][cell])
            if inputdata[row][cell] < min(adjacents):
                lowpoints.append(inputdata[row][cell])
    return lowpoints


def find_risk(lowpoints):
    risk = 0
    for x in lowpoints:
        risk += 1 + x
    return risk


print(find_risk(find_lowpoints(inputdata)))
