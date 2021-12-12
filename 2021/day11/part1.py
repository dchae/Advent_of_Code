istestcase = True

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day10/exinput1.txt"
    )

else:
    inputfilename = (
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day10/input1.txt"
    )

inputdata = []
with open(inputfilename) as inputfile:  # read input and initialise inputdata
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip()
        inputdata.append(line)
# print(inputdata)
