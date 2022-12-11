lines =
  File.read("2022/day10/input.txt").gsub(/\b[a-z]+\b/, "0").split.map(&:to_i)

x_vals, crt = [], []
lines.reduce(1) do |x, num|
  x_vals << x
  crt << ((x - 1..x + 1).cover?(crt.size % 40) ? "█" : " ")
  x + num
end

# p1
puts (20..220).step(40).sum { |ss| x_vals[ss - 1] * ss }
# p1
puts crt.each_slice(40).map { |row| row.join }.join("\n")
