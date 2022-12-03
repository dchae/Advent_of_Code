lines = File.read("2022/day2/input.txt").split("\n").map { |x| x.split.join }

subkey = { "Z" => %W[AY BZ CX], "X" => %W[AZ BX CY], "Y" => %W[AX BY CZ] }
lines.map! { |round| subkey[round[1]].find { |x| x.start_with?(round[0]) } }

score = { %W[AY BZ CX] => 6, %W[AZ BX CY] => 0, %W[AX BY CZ] => 3 }
points = Hash.new
%W[X Y Z].each_with_index { |x, i| points[x] = i + 1 }

res = 0
lines.each do |round|
  score.keys.each do |k|
    res += score[k] + points[round[1]] if k.include?(round)
  end
end
p res
