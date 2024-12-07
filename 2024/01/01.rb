def filepath(filename, subfolder = '')
  File.join(*[File.expand_path(__dir__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
lines = File.read(path).split("\n")

# Part 1
values = lines.map { |line| line.split(/\s+/).map(&:to_i) }
list1, list2 = values.transpose.each(&:sort!)

distances = list1.zip(list2).map { |a, b| (b - a).abs }
p distances.sum

# Part 2
counts = list2.tally
sim_score = list1.sum { |x| x * (counts[x] || 0) }
p sim_score
