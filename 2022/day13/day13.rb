# how many pairs of packets are in the right order?

lines = File.read("2022/day13/input.txt").split(/\n\n/)
lines.map! { |line| line.split.map { |x| eval(x) } }

def ordered?(a, b)
  int_count = [a, b].count { |x| x.is_a? Integer }
  if int_count == 1
    if a.is_a? Integer
      a = [a]
    else
      b = [b]
    end
  end
  if int_count == 2
    return a <=> b
  else
    i = 0
    while a[i] && b[i]
      comp = ordered?(a[i], b[i])
      return comp if comp != 0
      i += 1
    end
    return a.size <=> b.size
  end
end

res = []
lines.size.times do |i|
  pair = lines[i]
  a, b = pair
  res << i + 1 if ordered?(a, b) < 1
end

p res.sum
