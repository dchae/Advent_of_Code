istestcase = True

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
