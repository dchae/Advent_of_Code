lines =
  File
    .read("2022/day8/input.txt")
    .split("\n")
    .map { |line| line.chars.map { |x| x.to_i } }

p lines

count = lines.size * 2 + (lines.first.size - 2) * 2

(1...(height = lines.size) - 1).each do |row|
  (1...(width = lines[row].size) - 1).each do |col|
    p tree = lines[row][col]
    count += 1 if [
      (0...col).all? { |x| lines[row][x] < tree },
      (col + 1...width).all? { |x| lines[row][x] < tree },
      (0...row).all? { |x| lines[x][col] < tree },
      (row + 1...height).all? { |x| lines[x][col] < tree },
    ].any?
  end
end
p count
