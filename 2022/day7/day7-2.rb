lines = File.read("2022/day7/input.txt")[2..].split("\n$ ")

directories = {}
filepath = []
lines.each do |l|
  if l.split().first == "cd"
    l = l.split
    if l[1] == ".."
      filepath.pop
    elsif l[1] == "/"
      filepath = []
    else
      filepath << l[1]
    end
  else # ls + results
    items = l[3..].split("\n")
    cur = directories
    filepath.each { |dir| cur = cur[dir] }
    subdirs, items = items.partition { |x| x.start_with?("dir") }
    subdirs.map! { |sd| sd.split.last }
    subdirs.each { |sd| cur[sd] = {} }
    cur["items"] = items.map { |item| item.split }
  end
end

dir_sizes = []
def recursum(dir, dir_sizes)
  if dir.keys.empty?
    return 0
  else
    subdirs = dir.keys.filter { |x| x != "items" }
    dir_size =
      dir["items"].sum { |size, item| size.to_i } +
        subdirs.sum { |subdir| recursum(dir[subdir], dir_sizes) }
    dir_sizes << dir_size
    return dir_size
  end
end
used_space = recursum(directories, dir_sizes)

# part 1
p dir_sizes.filter { |x| x <= 100_000 }.sum

# part 2
p dir_sizes.sort.find { |size| size > 30_000_000 - 70_000_000 + used_space }
