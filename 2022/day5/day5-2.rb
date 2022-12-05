lines = File.read("2022/day5/input.txt").split("\n")

crates = Hash.new { |h, k| h[k] = [] }

line_idx = 0
while true
  line = lines[line_idx]
  break if line.empty?
  line.chars.each_with_index { |c, i| crates[i] << c if c =~ /[A-Z]/ }
  line_idx += 1
end

instructions =
  (line_idx + 1...lines.size).map do |i|
    lines[i].gsub(/[^\d]/, " ").split.map(&:to_i)
  end

crates = [[]] + crates.keys.sort.map { |k| crates[k] }

instructions.each do |quantity, from, to|
  crates[to].unshift(*crates[from].slice!(0, quantity))
end

p crates.map { |arr| arr.first }.join("")
