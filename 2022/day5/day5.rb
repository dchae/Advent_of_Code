lines = File.read("2022/day5/exinput.txt").split("\n")

crates = Hash.new { |h, k| h[k] = [] }

line_idx = 0
while true
  line = lines[line_idx]
  break if line.strip.empty?
  line.chars.each_with_index { |c, i| crates[i] << c if c =~ /[A-Z]/ }
  line_idx += 1
end
line_idx += 1

instructions = []
while line_idx < lines.size
  line = lines[line_idx]
  instructions << line.gsub(/[^\d]/, " ").split.map(&:to_i)
  line_idx += 1
end

p crates = [[]] + crates.keys.sort.map { |k| crates[k] }

p instructions

instructions.each do |quantity, from, to|
  quantity.times { |_| crates[to].unshift(crates[from].shift) }
end

p crates.map { |arr| arr.first }.join("")
