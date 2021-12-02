inputdata = []

with open("input1.txt") as inputfile:
    for line in inputfile:
        inputdata.append(int(line.strip()))

count = 0
for i in range(1, len(inputdata)):
    if inputdata[i - 1] < inputdata[i]:
        count += 1

print(count)
