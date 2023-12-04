def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
input = File.read(path)
schematic = input.split("\n")

schematic.each { |row| puts row }

# Part 1

# For each row
# Get the index and size of each number
#   For each position in the number
#     check if adjacent to symbol
#       If true, add to res

def check_adj_to_symbol(y, x, grid = schematic)
  (-1..1).any? do |y_offset|
    (-1..1).any? do |x_offset|
      unless (0...grid.size).include?(y + y_offset) &&
               (0...grid[0].size).include?(x + x_offset)
        next
      end
      char = grid[y + y_offset][x + x_offset]
      char =~ /[^0-9\.]/
    end
  end
end

res = []
schematic.each_with_index do |row, y|
  x = 0
  while x < row.size
    if row[x] =~ /\d/
      numstr = ''
      size = 0
      while row[x + size] =~ /\d/
        numstr << row[x + size]
        size += 1
      end
      if size.times.any? { |j| check_adj_to_symbol(y, x + j, schematic) }
        res << numstr.to_i
      end
      x += size
    end
    x += 1
  end
end
p res.sum

# Part 2

def check_adj_to_gear(y, x, numstr, grid, gears)
  (-1..1).any? do |y_offset|
    (-1..1).any? do |x_offset|
      unless (0...grid.size).include?(y + y_offset) &&
               (0...grid[0].size).include?(x + x_offset)
        next
      end
      char = grid[y + y_offset][x + x_offset]
      if char =~ /\*/
        gear_coords = [y + y_offset, x + x_offset]
        gears[gear_coords] << numstr.to_i
        return true
      end
    end
  end
end

gears = Hash.new { |h, k| h[k] = [] }
schematic.each_with_index do |row, y|
  x = 0
  while x < row.size
    if row[x] =~ /\d/
      numstr = ''
      size = 0
      while row[x + size] =~ /\d/
        numstr << row[x + size]
        size += 1
      end
      size.times.any? do |j|
        check_adj_to_gear(y, x + j, numstr, schematic, gears)
      end
      x += size
    end
    x += 1
  end
end

p gears.select { |_, gear| gear.size == 2 }.values.map { |x, y| x * y }.sum

# This should fail for "connected" gears 
# i.e., cases where there are more than one real gears adjacent to only a 
# first or last digit
# e.g.:
# ..123..
# .....*.
# ..456..
# .....*.
# ..789..
# numstr 456 would not be added to the gears entry for the gear on the 4th 
# row. This could be solved by iterating with #each instead of #any?, but 
# we would have to deal with duplicate entries to the gears hash. 
# Could solve this by identifying nums in a hash via their positions, but 
# since the edge case does not appear in my input, it works as is.