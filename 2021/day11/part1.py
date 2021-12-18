import queue

istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day11\exinput1.txt"

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day11\input1.txt"

inputdata = []
with open(inputfilename) as inputfile:  # read input and initialise inputdata
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip()
        inputdata.append([int(x) for x in line])

# if adjacent cell is greater than 9, add to toflash and set to 0
def flash(row, cell, toflash):
    if inputdata[row][cell] > 0:
        inputdata[row][cell] += 1
    if inputdata[row][cell] > 9:
        print(f"{inputdata[row][cell]=}")
        toflash.put((row, cell))
        print(f"{(row, cell)=}")
        inputdata[row][cell] = 0
        print(f"This should be zero: {inputdata[row][cell]=}")


def simulation(inputdata, period):
    step = 0
    while step < period:
        toflash = queue.Queue()
        for row in range(len(inputdata)):
            for col in range(len(inputdata[0])):
                inputdata[row][col] += 1  # add one to energy lvl of each octopus
                if inputdata[row][col] > 9:  # initialise initial flashes
                    toflash.put((row, col))

        while not toflash.empty():
            octopus = toflash.get()
            row = octopus[0]
            cell = octopus[1]
            inputdata[row][cell] = 0
            if row > 0:  # if cell has upper adjacent
                flash(row - 1, cell, toflash)
            if row < len(inputdata) - 1:  # if cell has lower adjacent
                flash(row + 1, cell, toflash)
            if cell > 0:  # if cell has left adjacent
                flash(row, cell - 1, toflash)
            if cell < len(inputdata) - 1:  # if cell has right adjacent
                flash(row, cell + 1, toflash)
            if row > 0 and cell > 0:  # if cell has upper left adjacent
                flash(row - 1, cell - 1, toflash)
            if row > 0 and cell < len(inputdata) - 1:  # if cell has upper right adj
                flash(row - 1, cell + 1, toflash)
            if row < len(inputdata) - 1 and cell > 0:  # if cell has lower left adj
                flash(row + 1, cell - 1, toflash)
            if (
                row < len(inputdata) - 1 and cell < len(inputdata) - 1
            ):  # if cell has lower right adj
                flash(row + 1, cell + 1, toflash)
        step += 1


simulation(inputdata, 1)
for row in inputdata:
    print(row)
