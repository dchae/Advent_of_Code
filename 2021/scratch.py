dotmap = {(0, 14), (9, 10)}
dotmap.add((6, 10))


for x in dotmap:
    if x == (0, 14):
        dotmap.remove((0, 14))
        dotmap.add((0, 14))

print(dotmap)

# original y - 2*distance from fold
# dot[1]-(2*(dot[1]-f[1]))
# 2*f[1]-dot[1]
