def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
input = File.read(path).split("\n")

# Part 1
# s_arrs = input.map { |s| s.gsub(/[^0-9]/, "").chars}
# p s_arrs.map { |arr| arr[0] + arr[-1]}.map(&:to_i).sum

# Part 2
numbers =
  %w[one two three four five six seven eight nine].each_with_index
    .map { |x, i| [x, i + 1] }.to_h
res =
  input.map do |line|
    line = line.scan(/(?=(one|two|three|four|five|six|seven|eight|nine|[0-9]))/)
    line = line.flatten.map { |s| s =~ /[0-9]/ ? s : (numbers[s]).to_s }
    (line[0] + line[-1]).to_i
  end
p res.sum
