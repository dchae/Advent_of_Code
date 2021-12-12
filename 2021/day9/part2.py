istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day9/exinput1.txt"
    )

else:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day9/input1.txt"
    )

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


def find_basin(inputdata, lowpoint):
    inputdatacopy = [x[:] for x in inputdata]
    # find adjacents that are != 9
    # add found adjacents to list (will be pushed to basin list)
    uncheckedbasin = [lowpoint]
    basin = []
    while len(uncheckedbasin) > 0:
        currentcell = uncheckedbasin[0]
        row = currentcell[0]
        cell = currentcell[1]
        if cell > 0 and inputdatacopy[row][cell - 1] < 9:
            uncheckedbasin.append((row, (cell - 1)))
        if cell < len(inputdatacopy[row]) - 1 and inputdatacopy[row][cell + 1] < 9:
            uncheckedbasin.append((row, (cell + 1)))
        if row > 0 and inputdatacopy[row - 1][cell] < 9:
            uncheckedbasin.append(((row - 1), cell))
        if row < len(inputdatacopy) - 1 and inputdatacopy[row + 1][cell] < 9:
            uncheckedbasin.append(((row + 1), cell))
        uncheckedbasin.remove(currentcell)
        if currentcell not in basin:
            basin.append(currentcell)
        inputdatacopy[row][cell] = 9
    return basin


# print("basin:", find_basin(inputdata, (0, 9)))


def find_basins(inputdata):
    basins = []
    for lowpoint in find_lowpointcoordinates(inputdata):  # find basin for each lowpoint
        basins.append(sorted(find_basin(inputdata, lowpoint)))
    return sorted(basins, key=len, reverse=True)


def multiplybasins(basins):
    basins = basins[:3]
    product = 1
    for basin in basins:
        product *= len(basin)
    return product


print("Answer:", multiplybasins(find_basins(inputdata)))
# print("\nLowpoints:", find_lowpointcoordinates(inputdata))

# print("Grid:")
# for x in inputdata:
#     print(x)
