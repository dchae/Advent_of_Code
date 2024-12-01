def filepath(filename, subfolder = '')
  File.join(*[File.expand_path(__dir__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
lines = File.read(path).split("\n")

# Part 1
values = lines.map { |line| line.split(' ').map(&:to_i) }
list1 = []
list2 = []

values.each do |x|
  list1.push(x[0])
  list2.push(x[1])
end

list1.sort!
list2.sort!

# distances = list1.zip(list2).map { |a, b| (b - a).abs }
# p distances.reduce { |a, b| a + b }

# Part 2
counts = list2.tally
p list1.reduce(0) { |acc, x| x * (counts[x] || 0) + acc }
