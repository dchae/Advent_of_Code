lines = File.read("/home/dchae/github-dchae/Advent_of_Code/2022/day1/input.txt").split("\n\n")
p lines.map { |s| s.split.map { |x| x.to_i}.sum }.sort.reverse.take(3).sum