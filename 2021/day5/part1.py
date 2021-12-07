istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day5\exinput1.txt"
    ventmap = [["." for x in range(10)] for y in range(10)]

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day5\input1.txt"
    ventmap = [["." for x in range(10 ** 3)] for y in range(10 ** 3)]

inputdata = []
with open(inputfilename) as inputfile:
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip().split(" -> ")
        inputdata.append([tuple(map(int, x.split(","))) for x in line])


def drawventmap(ventmap):
    for x in ventmap:
        for i in x:
            print(i, end="")
        print()


def drawlines(inputdata, ventmap):
    for drawline in inputdata:
        point1 = drawline[0]
        point2 = drawline[1]
        # print(f"{drawline=}")
        # print(f"{point1=}")
        # print(f"{point2=}")

        # print(f"{point1[1]=}")
        # print(f"{point2[1]=}")

        # print(f"{point1[0]=}")
        # print(f"{point2[0]=}")
        # print(f"{ventmap[9][0]=}")
        if point1[1] == point2[1]:
            if point1[0] > point2[0]:
                upper = point1[0]
                lower = point2[0]
            else:
                lower = point1[0]
                upper = point2[0]
            for x in range(lower, upper + 1):
                y = point1[1]
                if ventmap[y][x] == ".":
                    ventmap[y][x] = 1
                else:
                    ventmap[y][x] += 1
        if point1[0] == point2[0]:
            if point1[1] > point2[1]:
                upper = point1[1]
                lower = point2[1]
            else:
                lower = point1[1]
                upper = point2[1]
            for y in range(lower, upper + 1):
                x = point1[0]
                if ventmap[y][x] == ".":
                    ventmap[y][x] = 1
                else:
                    ventmap[y][x] += 1


def score(ventmap):
    sum = 0
    for row in ventmap:
        for cell in row:
            if isinstance(cell, int) and cell > 1:
                sum += 1
    return sum


# print(inputdata)

# drawventmap(ventmap)
drawlines(inputdata, ventmap)
# drawventmap(ventmap)
print("score =", score(ventmap))
