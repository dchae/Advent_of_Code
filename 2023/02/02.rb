def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
path = filepath('exinput.txt')
input = File.read(path)
games =
  input
    .split("\n")
    .map do |line|
      handfuls = line.split(': ')[1].split('; ')
      handfuls.map do |handful|
        handful
          .split(', ')
          .map do |handful|
            v, k = handful.split(' ')
            [k, v.to_i]
          end
          .to_h
      end
    end
p games
bag = Hash.new(0).merge({ 'red' => 12, 'green' => 13, 'blue' => 14 })
p1 =
  (1..games.size).select do |i|
    game = games[i - 1]
    game.all? do |handful|
      handful.all? { |color, count| count.to_i <= bag[color] }
    end
  end

p p1.sum

# Part 2

p2 =
  games.map.with_index do |game, i|
    game.each_with_object(Hash.new(0)) do |handful, max_h|
      max_h.merge!(handful) { |key, v1, v2| [v1, v2].max }
    end
  end

p p2.map { |min_set| min_set.values.reduce(&:*) }.sum
