lines = File.read("2022/day9/exinput.txt").split("\n").map { |line| line.split }
lines.map! { |line| [line.first, line.last.to_i] }

# starting position = 0, 0
# iterate through lines with dir, steps
# step.times do |i|
#   if the distance between head and tail > 1
#     if head and tail are on the same row or column
#       move 1 in dir
#     else
#       move 1 in dir and align to dir axis of head
#     end
#   end
#   seen << tail
# end

head, tail = [0, 0], [0, 0]
seen = [[0, 0]]

def delta(a, b)
  x = (a[0] - b[0]).abs
  y = (a[1] - b[1]).abs
  return 0 if [x, y].all? { |d| d < 2 }
  return 1 if a[0] == b[0] || a[1] == b[1]
  return 2
end

def newpos(dir, a)
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
  a
end

lines.each do |dir, steps|
  steps.times do |i|
    head = newpos(dir, head)
    delta = delta(head, tail)
    next if delta == 0
    if delta == 1
      tail = newpos(dir, tail)
    elsif delta > 1
      tail = newpos(dir, tail)
      if dir =~ /[LR]/
        tail[1] = head[1]
      else
        tail[0] = head[0]
      end
    end
    seen << tail[0..]
  end
end
p seen.uniq.count

prev = 6.times.map { |x| ["."] * 6 }
seen.each { |x, y| prev[x][y] = "#" }
prev[0][0] = "s"
prev.transpose.reverse.each { |row| puts row.join(" ") }
