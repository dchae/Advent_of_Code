# input: string
# output: int
# - given row y = 2000000, return the number of positions
#   in the row that cannot contain a beacon

# algo:
# given row n
# get max number of positions (row size)

# def sensor_coverage_at(row)
#   return range that sensor covers at given row
# end

# covered = []
# for sensor in sensors
#   covered << sensor_coverage_at(row)

# subtract all the ranges in covered from (0..row_size)

sensors = {}
lines = File.read("2022/day15/input.txt").split(/\n/)
lines.map! do |line|
  line.split(":").map { |s| s.gsub(/[^\d|-]/, " ").split.map(&:to_i) }
end

lines.each { |sensor, beacon| sensors[sensor] = beacon }

row_max_x = sensors.max_by { |k, v| v[0] }.last.first
row_min_x = sensors.min_by { |k, v| v[0] }.last.first
row_range = row_min_x, row_max_x

def sensor_to_beacon(sensors, sensor)
  x1, y1 = sensor
  x2, y2 = sensors[sensor]
  (x2 - x1).abs + (y2 - y1).abs #includes S
end

def sensor_coverage(sensors, sensor, row)
  distance = sensor_to_beacon(sensors, sensor)
  y_offset = (sensor[1] - row).abs
  return nil if y_offset >= distance

  base_range = sensor[0] - distance, sensor[0] + distance #non-inclusive
  base_range[0] += y_offset
  base_range[1] -= y_offset
  base_range
end

def aggregate_sensor_coverage(sensors, row)
  covered_ranges = []
  sensors.each_key do |sensor|
    covered_ranges << sensor_coverage(sensors, sensor, row)
  end
  covered_ranges.compact || []
end

# p1
# require "set"
# def find_coverage(covered_ranges)
#   covered_ranges.map { |a, b| Set.new((a...b)) }.reduce(&:+)
# end

# y = 2_000_000
# p covered_ranges = aggregate_sensor_coverage(sensors, y)
# p find_coverage(covered_ranges).size

def tuning_frequency(x, y)
  x * 4_000_000 + y
end

# for row in search_space
# check if row has any non-covered spots
# if it does, return the spot(s)

# slow as hell but it works

def p2(row_range, sensors, search_space)
  search_space.times do |row|
    covered_ranges = aggregate_sensor_coverage(sensors, row).sort
    cur_range = [0, 0]
    covered_ranges.each do |a, b|
      if a <= cur_range[1]
        cur_range[1] = [cur_range[1], b].max
      else
        return cur_range[1] + 1, row
      end
    end
    cur_range
  end
  return nil
end
search_space = 4_000_000 #20
p res = p2(row_range, sensors, search_space)
p tuning_frequency(*res)
