"""
input: string
output: int

- find the path with lowest total risk
- start at top left, end at bottom right
- risk is incurred when you *enter* a position
    - starting square incurs no risk

ds: dict, queue

algo: Dijkstra
init seen set
init parentsMap hashmap
init nodeCosts hashmap
init nodeCosts[start] = 0
init priority_queue heapq
push (0, start) to priority_queue
while priority_queue:
    pop the node with minimum cost
    for all adjacent nodes:
        if not in seen and ...:
            push adj_node to priority_queue
            update parentsMap

reconstruct path from parentsMap

"""
from collections import defaultdict
import heapq as heap

inputfilename = r"2021/day15/input.txt"
with open(inputfilename) as inputfile:
    lines = inputfile.readlines()
    map = [list(int(x) for x in line.strip()) for line in lines]


def dijkstra(map, start):
    seen = set()
    parentsMap = {}
    costs = defaultdict(lambda: float("inf"))
    costs[start] = 0
    priority_queue = []
    heap.heappush(priority_queue, (0, start))

    while priority_queue:
        _, pos = heap.heappop(priority_queue)
        seen.add(pos)
        adj_positions = []
        for offset in [-1, 1]:
            if pos[0] + offset in range(0, len(map)):
                adj_positions.append((pos[0] + offset, pos[1]))
            if pos[1] + offset in range(0, len(map)):
                adj_positions.append((pos[0], pos[1] + offset))

        for adj_pos in adj_positions:
            if adj_pos in seen:
                continue
            risk = map[adj_pos[1]][adj_pos[0]]
            newCost = costs[pos] + risk
            if newCost < costs[adj_pos]:
                parentsMap[adj_pos] = pos
                costs[adj_pos] = newCost
                heap.heappush(priority_queue, (newCost, adj_pos))
    return parentsMap, costs


parentsMap, costs = dijkstra(map, (0, 0))

end = len(map[-1]) - 1, len(map) - 1
print(costs[end])

cur = end
path = []
while cur != (0, 0):
    path.append((cur, map[cur[1]][cur[0]]))
    cur = parentsMap[cur]
path.reverse()
# for pos, risk in path:
#     print(pos, risk)
