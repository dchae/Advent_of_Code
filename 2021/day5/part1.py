istestcase = False

if istestcase:
    inputdata = []
    with open(
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day5/exinput1.txt"
    ) as inputfile:
        lines = inputfile.readlines()
        for line in lines:
            line = line.strip().split()
            inputdata.append(line)
else:
    inputdata = []
    with open(
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day5/input1.txt"
    ) as inputfile:
        lines = inputfile.readlines()
        for line in lines:
            line = line.strip().split()
            inputdata.append(line)
