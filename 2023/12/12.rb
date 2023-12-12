def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
path = filepath('exinput.txt')
lines = File.read(path).split("\n")

# Part 1
lines_arrangements =
    lines.map { |line|
      line, arrangement = line.split(' ')
      [line.scan(/[^\.]+/), arrangement]
    }

lines_arrangements.each { |la| p la }
# Part 2
