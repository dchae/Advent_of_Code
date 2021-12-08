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
# print(sorted(signalpatterns[0], key=len))
# print(outputvalues)

# 1 needs 2 digits, 4:4, 7:3, 8:7
def gen_keydict(signal):
    keydict = {}
    signal = sorted(signal, key=len)
    newsignal = []
    for string in signal:
        if len(string) == 2:
            keydict[1] = set(string)
        elif len(string) == 3:
            keydict[7] = set(string)
        elif len(string) == 4:
            keydict[4] = set(string)
        elif len(string) == 7:
            keydict[8] = set(string)
        else:
            newsignal.append(string)
    a = keydict[7] - keydict[1]  # - subtracts all shared letters
    cf = keydict[7] - keydict[1]  # ^ returns all shared letters
    bd = keydict[4] - keydict[7]
    eg = keydict[8] - keydict[4] - a
    cd = {}
    print(f"{newsignal=}")
    for string in newsignal:
        string = set(string)
        if len(string - eg) == 5:
            keydict[9] = string
            e = keydict[8] - keydict[9]
            g = eg - e
        if len(string) == 6:
            if len(string - cf) == 4:
                keydict[0] = string
            else:
                keydict[6] = string

    for key, value in keydict.items():  # debugging
        print(key, ":", value)
    print(e)
    return keydict


# print(set("abcdfg")-set("eg"))
# length 5: *2, *3, *5
# length 6: *0, *6, 9

testsignal = [
    "acedgfb",
    "cdfbe",
    "gcdfa",
    "fbcad",
    "dab",
    "cefabd",
    "cdfgeb",
    "eafb",
    "cagedb",
    "ab",
]
testsignal = [
    "abcefg",
    "cf",
    "acdeg",
    "acdfg",
    "bcdf",
    "abdfg",
    "abdefg",
    "acf",
    "abcdefg",
    "abcdfg",
]
gen_keydict(testsignal)
# print(gen_keydict(testsignal))
