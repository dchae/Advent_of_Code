# lines = File.read("2022/day4/input.txt").split("\n")
# res = 0

# lines.each do |pair|
#   a, b = pair.split(",").map { |s| s.split("-").map { |x| x.to_i } }
#   a = a.first..a.last
#   b = b.first..b.last

#   res += 1 if !(a.begin > b.end || a.end < b.begin) #(a).cover?(b) || b.cover?(a)
# end

# p res
# res =
#   lines.reduce(0) do |sum, pair|
#     a, b = pair.split(",").map { |s| s.split("-").map { |x| x.to_i } }
#     a = a.first..a.last
#     b = b.first..b.last
#     sum + (a.begin > b.end || a.end < b.begin ? 0 : 1) #(a).cover?(b) || b.cover?(a)
#   end
# p res

p File
    .read("2022/day4/input.txt")
    .split("\n")
    .map { |pair| pair.split(",").map { |s| s.split("-").map(&:to_i) } }
    .reduce(0) { |sum, (a, b)|
      sum + (a.first > b.last || a.last < b.first ? 0 : 1)
    }
