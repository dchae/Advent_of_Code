monkeys = {}
lines = File.read("2022/day11/input.txt").split(/\n(?=Monkey)/)
lines.each do |line|
  data = line.split("\n")
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

mod = monkeys.map { |k, v| v[:test] }.uniq.reduce(&:*)

rounds = 10_000 # 20 for p1
rounds.times do |_|
  monkeys.each do |i, monkey|
    monkey[:inspection_count] += monkey[:items].size
    while !monkey[:items].empty?
      item = monkey[:items].shift
      num = monkey[:op][-1] =~ /old/ ? item : monkey[:op].last
      item = item.send(monkey[:op].first, num)
      item %= mod # /= 3 for p1
      if item % monkey[:test] == 0
        target = monkey[:if_true]
      else
        target = monkey[:if_false]
      end
      monkeys[target][:items] << item
    end
  end
end

p monkeys.map { |k, v| v[:inspection_count] }.sort[-2..].reduce(&:*)
