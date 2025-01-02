def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
path = filepath('exinput.txt')
input = File.read(path)

# Part 1


# Part 2