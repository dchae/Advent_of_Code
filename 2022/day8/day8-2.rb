lines =
  File
    .read("2022/day8/input.txt")
    .split("\n")
    .map { |line| line.chars.map { |x| x.to_i } }

# p lines

scores =
  (0...(height = lines.size)).map do |row|
    (0...(width = lines[row].size)).map do |col|
      tree = lines[row][col]

      left = 0
      (col - 1).downto(0) do |x|
        left += 1
        break if lines[row][x] >= tree
      end
      right = 0
      (col + 1...width).each do |x|
        right += 1
        break if lines[row][x] >= tree
      end
      up = 0
      (row - 1).downto(0) do |x|
        up += 1
        break if lines[x][col] >= tree
      end
      down = 0
      (row + 1...height).each do |x|
        down += 1
        break if lines[x][col] >= tree
      end

      scenic_score = left, right, up, down
      scenic_score.compact.reduce(1) { |x, y| x * y }
    end
  end

p scores.flatten.max
