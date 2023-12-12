def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
lines = File.read(path).split("\n")

# Part 1

# NTF the sum of the lengths of the shortest path between every pair of galaxies
# any rows or columns that contain no galaxies are twice as big (are duplicated)

# First "expand" the grid
grid = lines.map { |line| line.chars }
grid.each { |line| puts line.join }

def expanded_grid(grid, multiple)
  # duplicate columns
  # duplicate rows
  i = 0
  while i < grid.size
    if grid[i].uniq.size == 1
      (multiple - 1).times do |_|
        grid.insert(i, grid[i])
        i += 1
      end
    end
    i += 1
  end

  grid = grid.transpose

  i = 0
  while i < grid.size
    if grid[i].uniq.size == 1
      (multiple - 1).times do |_|
        grid.insert(i, grid[i])
        i += 1
      end
    end
    i += 1
  end

  grid.transpose
end
puts
# grid = expanded_grid(grid, 10)
# grid.each { |line| puts line.join }
# find all galaxies and put them in a hash

def collect_galaxies(grid)
  coords = {}
  i = 1
  grid.each_with_index do |row, y|
    row.each_with_index do |cell, x|
      if cell == '#'
        coords[i] = [y, x]
        i += 1
      end
    end
  end
  coords
end

def empty_row_count_between(y1, y2, grid, row_memo, empty_row_indices)
  y1, y2 = [y1, y2].sort
  if row_memo[[y1, y2]]
    return row_memo[[y1, y2]]
  else
    # p "Empty row count between #{y1} and #{y2}: "
    res = (y1 + 1...y2).count { |x| empty_row_indices[x] == true }
    row_memo[[y1, y2]] = res
    res
  end
end

def empty_col_count_between(
  x1,
  x2,
  transposed_grid,
  col_memo,
  empty_col_indices
)
  empty_row_count_between(x1, x2, transposed_grid, col_memo, empty_col_indices)
end

def get_empty_row_indices(grid)
  empty_rows = {}
  grid.each_index { |x| empty_rows[x] = true if grid[x].all? { |c| c == '.' } }
  empty_rows
end

def shortest_path_lengths_sum(grid, multiplier)
  transposed_grid = grid.transpose
  row_memo, col_memo = {}, {}
  coords = collect_galaxies(grid)
  empty_row_indices = get_empty_row_indices(grid)
  empty_col_indices = get_empty_row_indices(transposed_grid)
  pairs = coords.keys.combination(2).to_a
  res = 0
  pairs.each do |a, b|
    # p "pair: #{a}, #{b}"
    y1, x1 = coords[a]
    y2, x2 = coords[b]
    empty_rows =
      empty_row_count_between(y1, y2, grid, row_memo, empty_row_indices)
    empty_cols =
      empty_col_count_between(
        x1,
        x2,
        transposed_grid,
        col_memo,
        empty_col_indices,
      )
    row_count = (y1 - y2).abs - empty_rows + empty_rows * multiplier
    col_count = (x1 - x2).abs - empty_cols + empty_cols * multiplier
    res += row_count + col_count
  end
  res
end
res = shortest_path_lengths_sum(grid, 1000000)
p res
# Part 2

# create hash that stores the number of empty rows
