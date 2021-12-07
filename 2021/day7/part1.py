istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day7\exinput1.txt"

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day7\input1.txt"

inputdata = []
with open(inputfilename) as inputfile:  # read input and initialise inputdata
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip().split(",")
        for number in line:
            inputdata.append(int(number))

print(inputdata)


def optimise_fuel(inputdata):
    minfuel = 10 ** 9
    for i in range(max(inputdata) + 1):
        fuelused = 0
        for hpos in inputdata:
            fuelused += abs(hpos - i) * (abs(hpos - i) + 1) // 2
        if fuelused < minfuel:
            minfuel = fuelused
    return minfuel


def optimise_fuel(inputdata):
    minfuel = 10 ** 9
    prevfuel = 10 ** 9
    for i in range(max(inputdata) + 1):
        fuelused = 0
        for hpos in inputdata:
            fuelused += abs(hpos - i) * (abs(hpos - i) + 1) // 2
        if fuelused >= prevfuel:
            return prevfuel
        prevfuel = fuelused
    return minfuel


print(optimise_fuel(inputdata))
