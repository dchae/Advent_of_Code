lines = File.read("2022/day13/input.txt").split(/\n\n/)
lines.map! { |line| line.split.map { |x| eval(x) } }

def compare(a, b)
  int_count = [a, b].count { |x| x.is_a? Integer }
  a.is_a?(Integer) ? a = [a] : b = [b] if int_count == 1
  if int_count == 2
    a <=> b
  else
    i = 0
    while a[i] && b[i]
      comp = compare(a[i], b[i])
      return comp if comp != 0
      i += 1
    end
    a.size <=> b.size
  end
end

# p1
p1 = lines.size.times.sum(0) { |i| compare(*lines[i]) < 1 ? i + 1 : 0 }
p p1

# p2
lines << (packets = [[[2]], [[6]]])
sorted_lines = lines.flatten(1).sort { |a, b| compare(a, b) }
p packets.map { |packet| sorted_lines.index(packet) + 1 }.reduce(&:*)
