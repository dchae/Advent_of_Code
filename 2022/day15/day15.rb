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
  covered_ranges.compact
end

# def find_gaps(row_range, ranges)
#   row_min_x, row_max_x = row_range
#   starts = ranges.map { |a, b| [a, true] }
#   ends = ranges.map { |a, b| [b, false] }
#   start_count, gap_start = 0, row_min_x
#   gaps = []
#   points = starts.concat(ends).sort_by { |x, _| x }
#   points.each do |x, start|
#     if start
#       start_count += 1
#       gaps << [gap_start, x] if start_count == 1
#     else
#       start_count -= 1
#       gap_start = x if start_count == 0
#     end
#   end
#   if points.last.first < row_max_x + 1
#     gaps << [points.last.first, row_max_x + 1]
#   end
#   gaps
# end
require "set"
def find_coverage(covered_ranges)
  covered_ranges.map { |a, b| Set.new((a...b)) }.reduce(&:+)
end
y = 2_000_000
p covered_ranges = aggregate_sensor_coverage(sensors, y)
p find_coverage(covered_ranges).size
