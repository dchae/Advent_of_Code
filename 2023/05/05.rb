def filepath(filename, subfolder = '')
  File.join(*[File.expand_path('..', __FILE__), subfolder, filename].compact)
end

path = filepath('input.txt')
# path = filepath('exinput.txt')
input = File.read(path)

# Part 1
def parse(input)
  seeds, *maps = input.split("\n\n")
  maps =
    maps.map do |m|
      name, data = m.split(":\n")
      name = name.gsub(/ map/, '')
      data = data.split("\n")
      data = data.map { |conversion| conversion.split(' ').map(&:to_i) }
      [name, data]
    end
  seeds = seeds.split(': ')[1].split(' ').map(&:to_i)
  [seeds, maps.to_h]
end

seeds, maps = parse(input)

def convert(seeds, maps)
  seeds.map do |seed|
    maps.each do |k, conversions|
      conversions.each do |dest_range_start, source_range_start, range_len|
        source_range = (source_range_start...source_range_start + range_len)
        if source_range.include?(seed)
          seed = dest_range_start + seed - source_range_start
          break
        end
      end
    end
    seed
  end
end

# p convert(seeds, maps).min
# Part 2

seed_ranges =
  (0...seeds.size).step(2).map { |i| (seeds[i]...seeds[i] + seeds[i + 1]) }
seed_ranges = seed_ranges.sort_by { |r| r.min }
maps =
  maps.map do |k, conversions|
    conversions.map do |dest_range_start, source_range_start, range_len|
      [
        (source_range_start...source_range_start + range_len),
        (dest_range_start...dest_range_start + range_len),
      ]
    end.to_h
  end

def convert_range(seed_range, source_range, dest_range)
  # return nil if no overlap
  if seed_range.min > source_range.max || seed_range.max < source_range.min
    return nil
  end

  # calculate overlap
  overlap_start = [seed_range.min, source_range.min].max
  overlap_end = [seed_range.max, source_range.max].min + 1
  overlap_length = overlap_end - overlap_start

  # convert overlap
  converted_start = overlap_start + dest_range.min - source_range.min
  converted_end = converted_start + overlap_length

  converted_range = (converted_start...converted_end)

  # find leftovers
  leftover_l = (seed_range.min...source_range.min) if seed_range.min <
    source_range.min
  leftover_r = (source_range.max + 1...seed_range.max + 1) if seed_range.max >
    source_range.max


  res_ranges = [converted_range]
  res_ranges << leftover_l if leftover_l
  res_ranges << leftover_r if leftover_r

  res_ranges
end

def convert_ranges(seed_ranges, maps)
  maps.each do |conversions|
    new_seed_ranges = []

    while !seed_ranges.empty?
      seed_range = seed_ranges.shift

      converted = false

      conversions.each do |source_range, dest_range|
        converted_ranges = convert_range(seed_range, source_range, dest_range)

        if converted_ranges
          # p "#{seed_range} => #{converted_ranges}"
          new_range, *leftovers = converted_ranges
          new_seed_ranges << new_range
          seed_ranges.concat(leftovers)
          converted = true
        end
      end

      new_seed_ranges << seed_range unless converted
    end

    seed_ranges = new_seed_ranges.uniq.sort_by { |r| r.min }
  end

  seed_ranges
end

# p seed_ranges
# p maps
converted = convert_ranges(seed_ranges, maps)
p converted.min_by { |r| r.min }.min

# 12403039 too low
