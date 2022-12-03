lines = File.read("2022/day3/input.txt").split("\n").map { |x| x.split.join }
lines = lines.each_slice(3).to_a

require "set"
badges =
  lines.map do |a, b, c|
    (a.chars.to_set & b.chars.to_set & c.chars.to_set).first
  end
p badges.sum { |x| x.ord - (x =~ /[a-z]/ ? 96 : 38) }
