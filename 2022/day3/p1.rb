lines = File.read("2022/day3/exinput.txt").split("\n").map { |x| x.split.join }
lines.map! { |x| x.chars.each_slice(x.size / 2).to_a }

require "set"
dupes = lines.map { |a, b| a.to_set.intersection(b.to_set).first }
p dupes.sum { |x| x.ord - (x =~ /[a-z]/ ? 96 : 38) }
