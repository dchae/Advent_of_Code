istestcase = True

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


def find_lowpointcoordinates(inputdata):
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
                lowpoints.append((row, cell))
    return lowpoints


def check_adjacents(inputdata, lowpoint):
    # find adjacents that are != 9
    # add found adjacents to list (will be pushed to basin list)
    uncheckedbasin = [lowpoint]
    basin = []
    while len(uncheckedbasin) > 0:
        currentcell = uncheckedbasin[0]
        row = currentcell[0]
        cell = currentcell[1]
        if cell > 0 and inputdata[row][cell - 1] < 9:
            uncheckedbasin.append((row, (cell - 1)))
            basin.append((row, (cell - 1)))
        if cell < len(inputdata[row]) - 1 and inputdata[row][cell + 1] < 9:
            uncheckedbasin.append((row, (cell + 1)))
            basin.append((row, (cell + 1)))
        if row > 0 and inputdata[row - 1][cell] < 9:
            uncheckedbasin.append(((row - 1), cell))
            basin.append(((row - 1), cell))
        if row < len(inputdata) - 1 and inputdata[row + 1][cell] < 9:
            uncheckedbasin.append(((row + 1), cell))
            basin.append(((row + 1), cell))
        uncheckedbasin.remove(currentcell)
    return basin


print("adjacents:", check_adjacents(inputdata, (0, 1)))


def find_basins(inputdata):
    for lowpoint in find_lowpointcoordinates(inputdata):  # find basin for each lowpoint
        pass  # backtracking checkadjacents function


print("Grid:")
for x in inputdata:
    print(x)

print("\nLowpoints:", find_lowpointcoordinates(inputdata))
