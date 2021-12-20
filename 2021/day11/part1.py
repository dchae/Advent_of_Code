import queue

istestcase = True

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day11/exinput1.txt"
    )

else:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day11/input1.txt"
    )

inputdata = []
with open(inputfilename) as inputfile:  # read input and initialise inputdata
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip()
        inputdata.append([int(x) for x in line])

# if adjacent cell is greater than 9, add to toflash and set to 0
def flash(flashcount, flashrow, flashcell, toflash):
    if inputdata[flashrow][flashcell] > 0:
        inputdata[flashrow][flashcell] += 1
    if inputdata[flashrow][flashcell] > 9:
        toflash.put((flashrow, flashcell))
        inputdata[flashrow][flashcell] = 0


def simulation(inputdata, period):
    step = 0
    flashcount = 0
    while step < period:
        toflash = queue.Queue()
        for row in range(len(inputdata)):
            for cell in range(len(inputdata[0])):
                inputdata[row][cell] += 1  # add one to energy lvl of each octopus
                if inputdata[row][cell] > 9:  # initialise initial flashes
                    toflash.put((row, cell))
                    inputdata[row][cell] = 0
        while not toflash.empty():
            octopus = toflash.get()
            row = octopus[0]
            cell = octopus[1]
            flashcount += 1
            if row > 0:  # if cell has upper adjacent
                flash(flashcount, row - 1, cell, toflash)
            if row < len(inputdata) - 1:  # if cell has lower adjacent
                flash(flashcount, row + 1, cell, toflash)
            if cell > 0:  # if cell has left adjacent
                flash(flashcount, row, cell - 1, toflash)
            if cell < len(inputdata) - 1:  # if cell has right adjacent
                flash(flashcount, row, cell + 1, toflash)
            if row > 0 and cell > 0:  # if cell has upper left adjacent
                flash(flashcount, row - 1, cell - 1, toflash)
            if row > 0 and cell < len(inputdata) - 1:  # if cell has upper right adj
                flash(flashcount, row - 1, cell + 1, toflash)
            if row < len(inputdata) - 1 and cell > 0:  # if cell has lower left adj
                flash(flashcount, row + 1, cell - 1, toflash)
            if (
                row < len(inputdata) - 1 and cell < len(inputdata) - 1
            ):  # if cell has lower right adj
                flash(flashcount, row + 1, cell + 1, toflash)
        step += 1
    return flashcount


print(simulation(inputdata, 100), "Flashes")
for row in inputdata:
    for x in row:
        print(x, end="")
    print()
