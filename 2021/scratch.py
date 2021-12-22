dotmap = {(0, 14), (9, 10)}
dotmap.add((6, 10))


for x in dotmap:
    if x == (0, 14):
        dotmap.remove((0, 14))
        dotmap.add((0, 15))

print(dotmap)

line = 