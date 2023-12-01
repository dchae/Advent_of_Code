with open("2022/day17/exinput.txt") as f:
    jet_pattern = f.read()
    jet_pattern = [1 if x == ">" else -1 for x in jet_pattern]
print(jet_pattern)

width = 7
height = 100

types = [
    [12, 13, 14, 15],
    [5, 8, 9, 10, 13],
    [6, 10, 12, 13, 14],
    [0, 4, 8, 12],
    [8, 9, 12, 13],
]


class Rock:
    def __init__(self, type, x, y):
        self.type = type
        self.x = x
        self.y = y

    def shape(self):
        return types[self.type]

def new_rock(i, x, y):
    return Rock(i, x, y)

def