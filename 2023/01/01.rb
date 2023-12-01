def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
input = File.read(path).split("\n")

# Part 1
# s_arrs = input.map { |s| s.gsub(/[^0-9]/, "").chars}
# s_arrs.map { |arr| arr[0] + arr[-1]}.map(&:to_i).sum

# Part 2
numbers =
  'one, two, three, four, five, six, seven, eight, nine'
    .split(', ')
    .each_with_index
    .to_h
res =
  input.map do |line|
    # line = line.gsub(/(one|two|three|four|five|six|seven|eight|nine)/) do |x|
    #   x[0] + (numbers[x] + 1).to_s + x[-1]
    # end
    # line.gsub(/(one|two|three|four|five|six|seven|eight|nine)/) do |x|
    #   x[0] + (numbers[x] + 1).to_s + x[-1]
    # end
    line = line.scan(/(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/).flatten
    line = line.map { |s| s =~ /[0-9]/ ? s : (numbers[s] + 1).to_s }
    (line[0] + line[-1]).to_i
  end
p res.sum
# p res = res.map { |s| s.gsub(/[^0-9]/, '') }
# p res = res.map { |arr| arr[0] + arr[-1] }.map(&:to_i)
# p res.sum
# p res[79]

