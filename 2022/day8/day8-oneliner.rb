p (res = (lines = File.read("2022/day8/input.txt").split("\n").map { |y| y.chars.map { |x| { val: x.to_i, vis: false, vds:[] } } }).size.times.with_object(lines.transpose) { |i, cols| [lines[i], cols[i]].each { |row| [row, row.reverse].each { |row| row.reduce([-1]) { |seen, cell| cell[:vis] = true if cell[:val] > seen.max;cell[:vds] << (seen.index { |x| x >= cell[:val] } || (seen.size - 2)) + 1; [cell[:val]] + seen }}}}.flatten).count { |cell| cell[:vis] }, res.map { |cell| cell[:vds].reduce { |x, y| x * y } }.max


# p ((
#       lines =
#         File
#           .read("2022/day8/input.txt")
#           .split("\n")
#           .map { |y| y.chars.map { |x| { val: x.to_i, vds: [] } } }
#     )
#       .size
#       .times
#       .with_object(lines.transpose) do |i, cols|
#         [lines[i], cols[i]].each do |row|
#           [row, row.reverse].each do |row|
#             row.reduce([-1]) do |seen, cell|
#               cell[:vds] << (
#                 seen.index { |x| x >= cell[:val] } || (seen.size - 2)
#               ) + 1
#               [cell[:val]] + seen
#             end
#           end
#         end
#       end
#       .flatten
#       .map { |cell| cell[:vds].reduce { |x, y| x * y } }
#       .max
#   )
