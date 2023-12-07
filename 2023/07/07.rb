def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
lines = File.read(path)
    .split("\n")

# Part 1

hands_bids =
  lines
    .map do |line|
      hand, bid = line.split(' ')
      hand = hand.chars
      bid = bid.to_i
      [hand, bid]
    end

RANKS = ((2..9).map(&:to_s).to_a + %w[T J Q K A]).freeze

CARD_VALUE = RANKS.zip((0..12).to_a).to_h

def n_of_a_kind?(hand_tally, n)
  hand_tally.any? { |k, v| v > n - 1 }
end

def full_house?(hand_tally)
  hand_tally.map(&:last).sort == [2, 3]
end

def two_pair?(hand_tally)
  hand_tally.select { |k, v| v > 1 }.size > 1
end

def pair?(hand_tally)
  n_of_a_kind?(hand_tally, 2)
end

def high_card?(hand_tally)
  hand_tally.all? { |k, v| v == 1 }
end

def hand_value(hand_tally)
  if n_of_a_kind?(hand_tally, 5)
    6
  elsif n_of_a_kind?(hand_tally, 4)
    5
  elsif full_house?(hand_tally)
    4
  elsif n_of_a_kind?(hand_tally, 3)
    3
  elsif two_pair?(hand_tally)
    2
  elsif pair?(hand_tally)
    1
  elsif high_card?(hand_tally)
    0
  end
end

def compare_cards(hand1, hand2)
  hand1_arr = hand1.map { |card| CARD_VALUE[card] }
  hand2_arr = hand2.map { |card| CARD_VALUE[card] }
  hand1_arr <=> hand2_arr
end

def compare(hand1, hand2)
  # puts "#{hand1}, #{hand2}"
  hand1_value = hand_value(hand1.tally)
  hand2_value = hand_value(hand2.tally)

  comparison = hand1_value <=> hand2_value
  comparison == 0 ? compare_cards(hand1, hand2) : comparison
end

def total_winnings(hands_bids)
  sorted =
    hands_bids.sort { |(hand1, bid1), (hand2, bid2)| compare(hand1, hand2) }
  winnings =
    sorted.map { |hand, bid| bid }.map.with_index { |bid, i| (i + 1) * bid }
  winnings.sum
end

p total_winnings(hands_bids)

# Part 2
RANKS = (%w[J] + (2..9).map(&:to_s).to_a + %w[T Q K A]).freeze

CARD_VALUE = RANKS.zip((0..12).to_a).to_h

def full_house?(hand_tally, j_count)
  rest = hand_tally.select { |card, count| card != 'J' }
  if j_count == 0
    hand_tally.map(&:last).sort == [2, 3]
  elsif rest.size > 2
    false
  else
    rest.map(&:last).sort.first + j_count > 2
  end
end

def n_of_a_kind?(hand_tally, n)
  rest = hand_tally.select { |card, count| card != 'J' }
  rest.size == 0 || rest.any? { |k, v| v > n - 1 }
end

def hand_value(hand_tally)
  j_count = hand_tally['J'] || 0

  if n_of_a_kind?(hand_tally, 5 - j_count)
    # 5 of a kind
    6
  elsif n_of_a_kind?(hand_tally, 4 - j_count)
    # 4 of a kind
    5
  elsif full_house?(hand_tally, j_count)
    4
  elsif n_of_a_kind?(hand_tally, 3 - j_count)
    # Three of a Kind
    3
  elsif two_pair?(hand_tally)
    2
  elsif n_of_a_kind?(hand_tally, 2 - j_count)
    # One pair
    1
  elsif high_card?(hand_tally)
    0
  end
end

p total_winnings(hands_bids)