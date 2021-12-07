istestcase = True

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


def fish_sim(simulation_period):
    state = initialstate  # begin with initial state
    day = 0  # start at day 0
    while day < simulation_period:
        fish = 0  # index of state; i.e., position in list of individual fish
        fishcount = len(state)
        while fish < fishcount:  # iterate through all fish
            if state[fish] > 0:  # decrement timer unless 0
                state[fish] -= 1
            else:  # if timer is 0, reset to 6 and add baby fish to list
                state[fish] = 6
                state.append(8)
            fish += 1
        day += 1
        print(state)  # debugging
    return state


days = 18
print(initialstate)
print(len(fish_sim(days)))
