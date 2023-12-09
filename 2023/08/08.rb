def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
lines = File.read(path).split("\n")

# Part 1

def parse(lines)
  [
    lines[0],
    lines[2..].map do |line|
      k, v = line.split(' = ')
      v = v.scan(/[A-Z0-9]{3}/)
      [k, v]
    end.to_h,
  ]
end

directions, map = parse(lines)

def count_steps(directions, map, cur = 'AAA')
  steps = 0
  directions
    .tr('LR', '01')
    .chars
    .map(&:to_i)
    .cycle do |dir|
      return steps if cur[-1] == 'Z'
      cur = map[cur][dir]
      steps += 1
    end
end

# p count_steps(directions, map)
# Part 2

p directions
p map

starting_nodes = map.keys.select { |k| k[-1] == 'A' }

# def count_steps_together(directions, map, nodes)
#   steps = 0
#   directions
#     .tr('LR', '01')
#     .chars
#     .map(&:to_i)
#     .cycle do |dir|
#       return steps if nodes.all? { |node| node[-1] == 'Z' }
#       nodes = nodes.map { |node| map[node][dir] }.uniq
#       steps += 1
#     end
# end

p steps =
    starting_nodes.map { |starting_node|
      count_steps(directions, map, starting_node)
    }
p steps.reduce { |a, b| a.lcm(b) }
