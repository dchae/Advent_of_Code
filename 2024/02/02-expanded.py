path = r"input.txt"
with open(path, "r") as f:
    lines = f.readlines()
    stripped_lines = [line.strip() for line in lines]
    reports = [[int(x) for x in line.split()] for line in stripped_lines]


def is_safe(report):
    deltas = []
    for i in range(0, len(report) - 1):
        current = report[i]
        next = report[i + 1]
        deltas.append(next - current)

    # "the levels are either all increasing or all decreasing"
    clamped_deltas = [max(-1, min(1, x)) for x in deltas]
    types_of_deltas = set(clamped_deltas)
    all_increasing_or_decreasing = len(types_of_deltas) == 1

    # "any two adjacent levels differ by at least one and at most three"
    delta_magnitudes = [abs(x) for x in deltas]
    delta_magnitudes_safe = min(delta_magnitudes) >= 1 and max(delta_magnitudes) <= 3
    # note: the min condition was not necessary for my input at least

    return all_increasing_or_decreasing and delta_magnitudes_safe


safe_reports = [r for r in reports if is_safe(r)]
part1 = len(safe_reports)
print(part1)


def is_safe_dampened(report):
    for i in range(0, len(report)):
        # get report without the element at index i
        dampened_report = report[0:i] + report[i + 1 :]
        if is_safe(dampened_report):
            return True

    return False


safe_reports_dampened = [r for r in reports if is_safe_dampened(r)]
part2 = len(safe_reports_dampened)
print(part2)
