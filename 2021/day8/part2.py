istestcase = True

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

# number:len(string) => 1:2 4:4, 7:3, 8:7, 0,6,9:6, 2,3,5:5
# '-' subtracts all shared letters, ^ returns all non shared letters


def gen_keydict(signal):
    keydict = {}
    signal2 = []  # codes for 2,3,5 and 0,6,9
    for string in signal:  # find easy codes (1,4,7,8)
        if len(string) == 2:
            keydict[1] = set(string)
        elif len(string) == 3:
            keydict[7] = set(string)
        elif len(string) == 4:
            keydict[4] = set(string)
        elif len(string) == 7:
            keydict[8] = set(string)
        else:
            signal2.append(string)
    for string in signal2:  # find hard codes (2,3,5,0,6,9)
        string = set(string)
        if len(string) == 6:  # length 6: 0, 6, 9
            if len(string - keydict[4]) == 2:
                keydict[9] = string
            elif len(string - keydict[1]) == 4:
                keydict[0] = string
            else:
                keydict[6] = string
        else:  # length 5: 2, 3, 5
            if len(string - keydict[1]) == 3:
                keydict[3] = string
            elif len(string - keydict[4]) == 3:
                keydict[2] = string
            else:
                keydict[5] = string
    return keydict


def decode(signalpatterns, outputvalues):
    outputlist = []
    if len(signalpatterns) != len(outputvalues):  # check both inputs are same length
        return "Error: Lengths of signals and outputvalues do not match."
    for i in range(len(signalpatterns)):  # iterate through both lists
        outputentry = ""  # initialise output number
        keydict = gen_keydict(
            signalpatterns[i]
        )  # generate dictionary mapping strings to numbers
        for output in outputvalues[i]:  # decode each output string
            for key, value in keydict.items():
                if value == set(output):
                    outputentry += str(key)  # becomes a digit of output number
        outputlist.append(int(outputentry))  # add output number to a list
    return outputlist


# print("Decoded Outputs:", decode(signalpatterns, outputvalues))
print("Answer:", sum(decode(signalpatterns, outputvalues)))
