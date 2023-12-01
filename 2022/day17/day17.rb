jet_pattern =
  File.read("2022/day17/exinput.txt").chars.map { |x| x == ">" ? 1 : -1 }
p jet_pattern

width = 7
