# input: string
# output: int

# ds: dict, queue

# algo: dijkstra?
# parse input:
# given the flow rate of the valves, and the connections, create a node tree

# use dijsktra modified

# init seen set
# init parentsMap hashmap
# init nodeCosts hashmap
# init nodeCosts[start] = 0
# init priority_queue heapq
# push (0, start) to priority_queue
# while priority_queue:
#     pop the node with minimum cost
#     for all adjacent nodes:
#         if not in seen and ...:
#             push adj_node to priority_queue
#             update parentsMap

# reconstruct path from parentsMap
nodes = {}
lines = File.read("2022/day16/exinput.txt").split(/\n/)
lines.each do |line|
  valve_info, connection_info = line.split(";")
  valve_id = valve_info.split[1]
  flow_rate = valve_info.split("=")[1]
  connections = connection_info.split(/valves? /).last.split(/, /)

  nodes[valve_id] = { flow_rate: flow_rate, children: connections }
end

require "set"
def dijkstra(nodes, start)
  seen = Set.new()
  parentsMap = {}
  pressure_released = Hash.new(0)
  pressure_released[start] = 0
  priority_queue = []
  priority_queue << start
  cur_total_flow_rate = 0
  while !priority_queue.empty?
    cur_node = priority_queue.shift
    seen << cur_node
    cur_node[:children].each do |child_node|
      next if seen.include?(child_node)

      flow_rate = nodes[child_node][:flow_rate]
    end
  end
end

start_node = nodes["AA"]
dijkstra(nodes, start_node)
