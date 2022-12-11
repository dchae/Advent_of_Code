# PEDAC
# input: string
# output: int
# ds: arr
# algo:
# - init var x_values = []
# - init variable to represent register; x = 1
# - init variable to count cycles; cycle
# - for instruction, num in lines
#     x_values << x # if instruction is noop
#     if instruction is addx:
#       x_values << x
#       x += num
# - signal strength at cycle 1 = x_values[0] * 1

lines = File.read("2022/day10/input.txt").split("\n")
lines
  .map! { |line| line =~ /noop/ ? line : ["noop", line.split.last.to_i] }
  .flatten!

x_vals = []
x = 1
crt = []
row = []
lines.each do |num|
  x_vals << x
  cycle = x_vals.size

  sprite_pos = x
  pixel = ((sprite_pos - 1..sprite_pos + 1).cover?(row.size) ? "#" : ".")
  row << pixel
  if row.size >= 40
    crt << row
    row = []
  end
  x += num if !(num =~ /[a-z]/)
end
interesting = [20, 60, 100, 140, 180, 220]
p interesting.sum { |ss| x_vals[ss - 1] * ss }
crt.each { |row| p row.join }
