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
  flow = valve_info.split("=")[1].to_i
  connections = connection_info.split(/valves? /).last.split(/, /)

  nodes[valve_id] = {
    id: valve_id,
    flow_rate: flow,
    open: false,
    children: connections,
  }
end

def recursum(
  nodes,
  cur_node,
  time_elapsed = 0,
  cur_total_flow_rate = 0,
  pressure_released = 0
)
  if time_elapsed == 30 #|| nodes.map { |k, v| v[:open] }.all?
    return pressure_released
  end
  # case where we open the valve
  case_open = 0
  p nodes.map { |k, v| v[:open] }
  p pressure_released
  if !cur_node[:open]
    cur_node[:open] = true
    case_open =
      cur_node[:children]
        .reject { |id| nodes[id][:open] }
        .map do |child_node|
          recursum(
            nodes,
            nodes[child_node],
            time_elapsed + 2,
            cur_total_flow_rate + cur_node[:flow_rate],
            (pressure_released + cur_total_flow_rate * 2),
          )
        end
        .max
  end
  # case where we skip
  case_skip =
    cur_node[:children]
      .reject { |id| nodes[id][:open] }
      .map do |child_node|
        recursum(
          nodes,
          nodes[child_node],
          time_elapsed + 1,
          cur_total_flow_rate,
          (pressure_released + cur_total_flow_rate),
        )
      end
      .max
  return [case_open, case_skip].max
end

start_node = nodes["AA"]
p recursum(nodes, start_node)
