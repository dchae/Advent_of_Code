# inputdata = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263] # testing example
inputdata = []
with open("input1.txt") as inputfile:
    for line in inputfile:
        inputdata.append(int(line.strip()))

count = 0
for i in range(1, len(inputdata)):
    if sum(inputdata[i - 1 : i + 2]) < sum(inputdata[i : i + 3]):
        count += 1
print(count)
