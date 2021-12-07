istestcase = False

inputfilename = ""  # Testcase switcher
if istestcase:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day6\exinput1.txt"

else:
    inputfilename = r"C:\github-dchae\Advent_of_Code\2021\day6\input1.txt"

initialstate = []
with open(inputfilename) as inputfile:  # read input and initialise initialstate
    lines = inputfile.readlines()
    for line in lines:
        line = line.strip().split(",")
        for number in line:
            initialstate.append(int(number))


def find_fishcount(initialstate, days):  # list index => days, value => # of fish born
    calendar = [
        0 for d in range(days + 8 + 1)
    ]  # list of days offset by 8 to account for initial fish born before day 0
    for fish in initialstate:  # populate calendar with fish in initialstate
        calendar[fish] += 1
    for today in range(
        len(calendar)
    ):  # increment future birthday counts by number of fish born today
        for day in range(
            today + 9, len(calendar), 7
        ):  # 9 days for new fish to reproduce once, then 7 days
            calendar[day] += calendar[today]
    # print(calendar)  # debugging
    return sum(calendar)


# print(initialstate)
print(find_fishcount(initialstate, 256))
