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


def find_gr(inputdata):
    ans = ""
    for i in range(len(inputdata[0])):
        onecount = 0
        digit = ""
        j = 0
        while j < len(inputdata):
            if inputdata[j][i] == "1":
                onecount += 1
            else:
                onecount -= 1
            j += 1
        if onecount > 0:
            digit = "1"
        else:
            digit = "0"
        ans += digit
    return ans


def find_er(inputdata):
    ans = ""
    for i in range(len(inputdata[0])):
        onecount = 0
        digit = ""
        j = 0
        while j < len(inputdata):
            if inputdata[j][i] == "1":
                onecount += 1
            else:
                onecount -= 1
            j += 1
        if onecount > 0:
            digit = "0"
        else:
            digit = "1"
        ans += digit
    return ans


def BinarytoDecimal(string):
    return int(string, 2)


gr = find_gr(inputdata)
print(BinarytoDecimal(gr))
er = find_er(inputdata)
print(BinarytoDecimal(er))
pc = BinarytoDecimal(gr) * BinarytoDecimal(er)

print(gr, er, pc)
print("Answer: ", pc)
