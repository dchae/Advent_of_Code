def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
input = File.read(path)

# Part 1

def parse(input)
  input
    .split("\n")
    .map { |line| line.split(':')[1].strip.split(' ').map(&:to_i) }
end

times, distance = parse(input)
race_times = times.zip(distance)

def distance_traveled(button_held_ms, time)
    speed = button_held_ms
    remaining_time = time - button_held_ms
    distance_traveled = speed * remaining_time
end

def possible_distances(time)
  time.times.map do |button_held_ms|
    distance_traveled(button_held_ms, time)
  end
end

def possible_wins(race_times)
  race_times.map do |race_time, record|
    possible_distances(race_time).count { |time| time > record }
  end
end

p possible_wins(race_times).reduce(&:*)


# Part 2

def parse2(input)
  input
    .split("\n")
    .map { |line| line.split(':')[1].gsub(/ /, "")}.map(&:to_i)
end
time, distance = parse2(input)

# Naive solution:
# p possible_distances(time).count { |time| time > distance }

# Algebraic solution:
def win_range(time, record)
  first_win = 0.5 * (time - (time**2 - 4 * record)**(0.5))
  last_win = 0.5 * (time + (time**2 - 4 * record)**(0.5))
  (first_win.ceil...last_win.ceil)
end

p win_range(time, distance).size
