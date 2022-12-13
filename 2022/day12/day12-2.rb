# input: string
# output: int

# - find the path with lowest total steps
# - start at "S", end at "E"
# - value at next square can be at most one higher than value at current square

# ds: dict, queue

# algo: BFS
# process input data into nested array

# def bfs method
# init seen set
# init queue = []
# init parents = {}
# add start to queue
# add start to seen
# parents[start] = nil

# while queue is not empty
#   cur = queue.shift
#   if cur is "E" # if we have reached the goal
#     break

#     for adjacent_pos in adjacent_positions(cur)
#       if adjacent_pos not in seen and steppable?(cur, adjacent_pos)
#         queue << adjacent_pos
#         parent[adjacent_pos] = cur
#         seen << adjacent_pos

# reconstruct path from parents hash

require "set"

def elevation(grid, pos)
  x, y = pos
  grid[y][x]
end

def grid_find(grid, target)
  x = nil
  y = grid.index { |row| x = row.index(target) }
  [x, y]
end

def steppable(grid, cur, next_pos)
  e_cur, e_next = elevation(grid, cur), elevation(grid, next_pos)
  e_cur.ord + 1 >= e_next.ord
end

def adjacent_positions(grid, cur)
  res = []
  x, y = cur
  [-1, 1].each do |offset|
    res << [x + offset, y] if (0...grid.first.size).cover?(x + offset)
    res << [x, y + offset] if (0...grid.size).cover?(y + offset)
  end
  res
end

def bfs(grid, start, target)
  seen = Set.new() << start
  queue = [start]
  parents = {}
  parents[start] = nil

  while !queue.empty?
    cur = queue.shift

    break if cur == target
    adjacents = adjacent_positions(grid, cur)
    adjacents.each do |next_pos|
      if !(seen === next_pos) && steppable(grid, cur, next_pos)
        queue << next_pos
        parents[next_pos] = cur
        seen << next_pos
      end
    end
  end

  parents
end

grid =
  File
    .read("2022/day12/input.txt")
    .split(/\n/)
    .map { |row| row.split("").map { |c| c =~ /[a-z]/ ? c.ord : c } }

start = grid_find(grid, "S")
grid[start[1]][start[0]] = "a".ord
target = grid_find(grid, "E")
grid[target[1]][target[0]] = "z".ord

p2_starts =
  (0...grid.size)
    .map { |y| (0...grid.first.size).map { |x| [x, y] } }
    .flatten(1)
    .filter { |x, y| grid[y][x] == "a".ord }

p2 =
  p2_starts.map do |start_candidate|
    parents = bfs(grid, start_candidate, target)
    if parents.include?(target)
      cur_tar = target
      path = [] << cur_tar
      while parents[cur_tar]
        path << parents[cur_tar]
        cur_tar = parents[cur_tar]
      end
      path.size - 1
    else
      nil
    end
  end
p p2.compact.min
