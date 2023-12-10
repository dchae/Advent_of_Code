def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
lines = File.read(path).split("\n")

# Part 1
grid = lines.map(&:chars)

# algo
# map each square in the grid to a node object
# Each node object should have the correct connections
# e.g.: `|` will have top: true, bottom: true, right: false, left: false

# For each potential connection in start, follow the path until it ends or it loops back.
# The connection that loops back will determine the two connections in Start.

# Find the farthest position
# head and tail nodes start at S and take the two connections
# keep track of steps
# When head == tail, return steps

class Node
  attr_accessor :val, :y, :x, :up, :down, :left, :right, :path
  def initialize(val, y, x)
    @val = val
    @y = y
    @x = x
    @up = nil
    @down = nil
    @left = nil
    @right = nil
    @path = nil
  end

  def neighbours
    [up, down, left, right]
  end

  def big_neighbours(grid)
    res = []
    (-1..1).each do |y_offset|
      (-1..1).each do |x_offset|
        unless (0...grid.size).include?(y + y_offset) &&
                 (0...grid[0].size).include?(x + x_offset)
          next
        end
        res << grid[y + y_offset][x + x_offset]
      end
    end
    res
  end

  def set_start
    @up = up && up.down == self ? up : nil
    @down = down && down.up == self ? down : nil
    @left = left && left.right == self ? left : nil
    @right = right && right.left == self ? right : nil
  end

  def set_connections(diagram)
    u = diagram[y - 1][x] if (0...diagram.size).include?(y - 1)
    d = diagram[y + 1][x] if (0...diagram.size).include?(y + 1)
    l = diagram[y][x - 1] if (0...diagram.first.size).include?(x - 1)
    r = diagram[y][x + 1] if (0...diagram.first.size).include?(x + 1)
    case @val
    when 'S'
      @up = u
      @down = d
      @left = l
      @right = r
    when 'F'
      @right = r
      @down = d
    when '7'
      @left = l
      @down = d
    when 'L'
      @right = r
      @up = u
    when 'J'
      @left = l
      @up = u
    when '|'
      @up = u
      @down = d
    when '-'
      @left = l
      @right = r
    end
  end
end

def map_to_nodes(grid)
  diagram =
    grid.map.with_index do |row, y|
      row.map.with_index { |val, x| Node.new(val, y, x) }
    end
  diagram.each { |row| row.each { |node| node.set_connections(diagram) } }
end

diagram = map_to_nodes(grid)
start_node = diagram.flatten.select { |node| node.val == 'S' }.first
start_node.set_start

def traverse(node, prev_node)
  steps = 0
  while true
    steps += 1
    return steps if node.val == 'S'

    next_node =
      node
        .neighbours
        .select { |next_node| next_node && next_node != prev_node }
        .first
    return false if next_node == nil
    prev_node = node
    node = next_node
  end
end

def get_max_steps(start_node)
  steps =
    start_node.neighbours.compact.map { |next_node| traverse(next_node, start_node) }
  steps.max / 2
end
p get_max_steps(start_node)

# Part 2

# "scan" each line while keeping track of how many up connection path tiles and 
# how many down connection path tiles we've crossed. 

def traverse2(node, prev_node)
  while true
    return true if node.val == 'S'
    node.path = true
    next_node =
      node
        .neighbours
        .select { |next_node| next_node && next_node != prev_node }
        .first
    return false if next_node == nil
    prev_node = node
    node = next_node
  end
end

# I kind of cheated here and just looked at my input to determine that start_node.right was one of two true connections
traverse2(start_node.right, start_node)

def scan_grid(diagram)
  count = 0
  inside_u = false
  inside_d = false
  diagram.each do |row|
    row.each do |node|
      if node.path
        inside_u = !inside_u if node.up
        inside_d = !inside_d if node.down
        print node.val
      else
        if inside_u == inside_d && inside_u
          count += 1
          print 'I'
        else
          print '.'
        end
      end
    end
    print "\n"
  end
  count
end

p scan_grid(diagram)