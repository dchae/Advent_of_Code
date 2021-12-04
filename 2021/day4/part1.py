istestcase = False
if istestcase:
    rnumseq = [
        7,
        4,
        9,
        5,
        11,
        17,
        23,
        2,
        0,
        14,
        21,
        24,
        10,
        16,
        13,
        6,
        15,
        25,
        12,
        22,
        18,
        20,
        8,
        19,
        3,
        26,
        1,
    ]
    boardlist = [
        [
            [22, 13, 17, 11, 0],
            [8, 2, 23, 4, 24],
            [21, 9, 14, 16, 7],
            [6, 10, 3, 18, 5],
            [1, 12, 20, 15, 19],
        ],
        [
            [3, 15, 0, 2, 22],
            [9, 18, 13, 17, 5],
            [19, 8, 7, 25, 23],
            [20, 11, 10, 24, 4],
            [14, 21, 16, 12, 6],
        ],
        [
            [14, 21, 17, 24, 4],
            [10, 16, 15, 9, 19],
            [18, 8, 23, 26, 20],
            [22, 11, 13, 6, 5],
            [2, 0, 12, 3, 7],
        ],
    ]

else:
    rnumseq = [
        26,
        55,
        7,
        40,
        56,
        34,
        58,
        90,
        60,
        83,
        37,
        36,
        9,
        27,
        42,
        19,
        46,
        18,
        49,
        52,
        75,
        17,
        70,
        41,
        12,
        78,
        15,
        64,
        50,
        54,
        2,
        77,
        76,
        10,
        43,
        79,
        22,
        32,
        47,
        0,
        72,
        30,
        21,
        82,
        6,
        95,
        13,
        59,
        16,
        89,
        1,
        85,
        57,
        62,
        81,
        38,
        29,
        80,
        8,
        67,
        20,
        53,
        69,
        25,
        23,
        61,
        86,
        71,
        68,
        98,
        35,
        31,
        4,
        33,
        91,
        74,
        14,
        28,
        65,
        24,
        97,
        88,
        3,
        39,
        11,
        93,
        66,
        44,
        45,
        96,
        92,
        51,
        63,
        84,
        73,
        99,
        94,
        87,
        5,
        48,
    ]
    boardlist = [[]]
    with open(
        r"/Users/danielchae/github-dchae/Advent_of_Code/2021/day4/input1.txt"
    ) as inputfile:
        lines = inputfile.readlines()
        boardcount = 0
        for line in lines:
            line = line.strip().split()
            if len(line) < 1:
                boardlist.append([])
                boardcount += 1
            else:
                boardlist[boardcount].append([int(x) for x in line])

print(boardlist)


def wincheck(board):
    for i in range(5):
        if sum(board[i]) == 100 * 5:
            print("Winning Board: ")
            return True
        if sum([board[j][i] for j in range(5)]) == 100 * 5:
            print("Winning Board: ")
            return True


def getwinningboardandnum(rnumseq, boardlist):
    for number in rnumseq:
        for board in boardlist:
            for i in range(5):
                for j in range(5):
                    if board[i][j] == number:
                        board[i][j] = 100
            if wincheck(board):
                return (board, number)


winningboard = getwinningboardandnum(rnumseq, boardlist)
print(winningboard)


def answercalc(winningboard):
    sum = 0
    for row in winningboard[0]:
        for i in row:
            if i < 100:
                sum += i
    return sum * winningboard[1]


print(answercalc(winningboard))
