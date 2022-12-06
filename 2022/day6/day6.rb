(line = File.read("2022/day6/input.txt").chomp.chars).each_index do |i|
  if line[i, (n = 14)].uniq.size == n
    (
      p i + n
      break
    )
  end
end

# i = 0
# while i < line.size - 4
#   break if line[i, 4].chars.uniq.size == 4
#   i += 1
# end
# i += 4
# p i

# while i < line.size
#   break if line[i, 14].chars.uniq.size == 14
#   i += 1
# end
# i += 14

# p i
