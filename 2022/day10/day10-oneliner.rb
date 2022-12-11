# # p1:
# puts (20..220).step(40).each_with_object(
# (x_values, crt = File.read("2022/day10/input.txt").gsub(/\b[a-z]+\b/, "0").split.map(&:to_i).each_with_object([[1], [], []]) { |num, (x, x_values, crt)| x_values << x[0]; crt << ((x[0] - 1..x[0] + 1).cover?(crt.size % 40) ? "#" : "."); x[0] += num }[1..]).first).sum { |ss, x_values| x_values[ss - 1] * ss }

# #p2:
# puts crt.each_slice(40).map { |row| row.join }.join("\n")
