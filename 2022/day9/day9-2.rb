lines =
  File
    .read("2022/day9/input.txt")
    .split("\n")
    .map { |line| line.split.map { |x| x =~ /[A-Z]/ ? x : x.to_i } }

head = [0, 0]
body = 9.times.map { |_| head[0..] } # change 9 to 1 for p1
seen = [head[0..]]

def set_head(dir, a)
  if dir =~ /[LD]/
    step = -1
  else
    step = 1
  end

  if dir =~ /[LR]/
    a[0] += step
  else
    a[1] += step
  end
end

def is_adjacent(a, b)
  x = (a[0] - b[0]).abs
  y = (a[1] - b[1]).abs
  [x, y].all? { |d| d < 2 }
end

def follow(a, b)
  return if is_adjacent(a, b)

  if a[0] > b[0]
    b[0] += 1
  elsif a[0] < b[0]
    b[0] -= 1
  end

  if a[1] > b[1]
    b[1] += 1
  elsif a[1] < b[1]
    b[1] -= 1
  end
end

lines.each do |dir, steps|
  steps.times do |i|
    set_head(dir, head)
    prev = head[0..]
    body.each do |knot|
      follow(prev, knot)
      prev = knot
    end
    seen << body.last[0..]
  end
end
p seen.uniq.count
