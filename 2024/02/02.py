path = r"input.txt"
with open(path, "r") as f:
    reports = [[int(x) for x in line.strip().split()] for line in f.readlines()]


def is_safe(report):
    deltas = [report[i + 1] - report[i] for i in range(len(report) - 1)]
    return (
        len(set(max(-1, min(1, x)) for x in deltas)) == 1
        and max(abs(x) for x in deltas) < 4
    )


part1 = sum(1 for r in reports if is_safe(r))
print(part1)

part2 = sum(
    1 for r in reports if any([is_safe(r[0:i] + r[i + 1 :]) for i in range(len(r))])
)
print(part2)
