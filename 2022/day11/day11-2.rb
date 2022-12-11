# ds: hashmaps of hashmaps, representing each monkey
# monkeys = {
#   0 => {
#     items: [79, 98],
#     operation: "new = old * 19",
#     test: (x % 23 ? 2 : 3),
#     inspection: 0
#   },
# }
monkeys = {}
lines = File.read("2022/day11/input.txt").split(/\n(?=Monkey)/)
lines.each do |m|
  data = m.split("\n")
  i = data[0].split.last.to_i
  monkeys[i] = {
    items: data[1].scan(/\b\d+\b/).map(&:to_i),
    op: [data[2].split[-2], (x = data[2].split.last) =~ /old/ ? x : x.to_i],
    test: data[3].split.last.to_i,
    if_true: data[4].split.last.to_i,
    if_false: data[5].split.last.to_i,
    inspection_count: 0,
  }
end

divisor = monkeys.map { |k, v| v[:test] }.uniq.reduce(&:*)
rounds = 10_000
rounds.times do |_|
  monkeys.each do |i, monkey|
    monkey[:inspection_count] += monkey[:items].size
    while !monkey[:items].empty?
      item = monkey[:items].shift
      num = monkey[:op][-1] =~ /old/ ? item : monkey[:op].last
      item = item.send(monkey[:op].first, num)
      item %= divisor
      if item % monkey[:test] == 0
        target = monkey[:if_true]
      else
        target = monkey[:if_false]
      end
      monkeys[target][:items] << item
    end
  end
  # puts "Round: #{_ + 1}"
  # monkeys.each { |i, monkey| puts "Monkey #{i}: #{monkey[:items].join(", ")}" }
  # puts
end

p monkeys.map { |k, v| v[:inspection_count] }.sort[-2..].reduce(&:*)
