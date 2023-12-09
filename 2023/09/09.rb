def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
lines = File.read(path).split("\n")

# Part 1
histories = lines.map { |line| line.split.map(&:to_i) }

def next_val(history)
  if history.uniq.size == 1
    history.last
  else
    next_seq = delta_map(history)
    history.last + next_val(next_seq)
  end
end

def delta_map(history)
  history.each_cons(2).map { |a, b| b - a }
end

p histories.map { |history| next_val(history) }.sum

# Part 2

def prev_val(history)
  if history.uniq.size == 1
    history.first
  else
    next_seq = delta_map(history)
    history.first - prev_val(next_seq)
  end
end


p histories.map { |history| prev_val(history) }.sum