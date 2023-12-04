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
    .map do |line|
      line.split(': ')[1].split(' | ').map { |s| s.split(' ').map(&:to_i) }
    end
end

def winning_numbers(card)
  winning, mine = card
  winning & mine
end

cards = parse(input)
values = cards.map { |card| value = (2**(winning_numbers(card).size - 1)).to_i }
p values.sum

# Part 2
cards = parse(input).each_with_index.map { |card, i| [i + 1, card] }.to_h
copies = Hash.new
cards.each do |n, card|
  wins = winning_numbers(card).size
  copies[n] = (n + 1..n + wins)
end

deck = Hash[(1..cards.size).to_a.product([1])]
deck.each do |cur_card, count|
  won_cards = copies[cur_card]
  won_cards.each { |card_n| deck[card_n] += count }
end
p deck.values.sum
