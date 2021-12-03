from collections import Counter

# if input is long list of single strings
inputdata = []
with open(
    r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day3/input1.txt"
) as inputfile:
    for line in inputfile:
        inputdata.append(line.strip())

# inputdata = [
#     "00100",
#     "11110",
#     "10110",
#     "10111",
#     "10101",
#     "01111",
#     "00111",
#     "11100",
#     "10000",
#     "11001",
#     "00010",
#     "01010",
# ]


def oxygen_criteria_filter(inputdata):
    binarylist = inputdata.copy()
    for digit in range(len(binarylist[0])):
        counted = Counter([x[digit] for x in binarylist])
        mostcommonvalue = "1"
        if counted["1"] < counted["0"]:
            mostcommonvalue = "0"
        i = 0
        while i < len(binarylist):
            if len(binarylist) == 1:
                break
            elif binarylist[i][digit] != mostcommonvalue:
                binarylist.remove(binarylist[i])
            else:
                i += 1
    return binarylist[0]


def co2_scrubber_filter(inputdata):
    binarylist = inputdata.copy()
    for digit in range(len(binarylist[0])):
        counted = Counter([x[digit] for x in binarylist])
        leastcommonvalue = "0"
        if counted["1"] < counted["0"]:
            leastcommonvalue = "1"
        i = 0
        while i < len(binarylist):
            if len(binarylist) == 1:
                break
            elif binarylist[i][digit] != leastcommonvalue:
                binarylist.remove(binarylist[i])
            else:
                i += 1
    return binarylist[0]


def BinarytoDecimal(string):
    return int(string, 2)


og_rating = BinarytoDecimal(oxygen_criteria_filter(inputdata))
c02s_rating = BinarytoDecimal(co2_scrubber_filter(inputdata))
print(og_rating * c02s_rating)
