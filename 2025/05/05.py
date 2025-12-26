f = open("exinput.txt", "r")
f = open("input.txt", "r")

id_ranges_raw, ids_raw = map(lambda s: s.split("\n"), f.read().strip().split("\n\n"))
print(f"{id_ranges_raw=}, {ids_raw=}")

id_ranges = [tuple(int(x) for x in r.split("-")) for r in id_ranges_raw]
ids = [int(x) for x in ids_raw]


def in_id_range(id_range, id):
    return id_range[0] <= id <= id_range[1]


def is_fresh(id):
    return any(in_id_range(id_range, id) for id_range in id_ranges)


def part1():
    res = sum(is_fresh(id) for id in ids)

    print(f"part1: {res=}")


part1()


def part2():
    res = 0
    # merge ranges
    sorted_ranges = sorted(id_ranges, key=lambda r: r[0])
    cur_start, cur_end = sorted_ranges[0]
    for next_start, next_end in sorted_ranges[1:]:
        # if they overlap
        if next_start <= cur_end + 1:
            cur_end = max(cur_end, next_end)
        else:
            res += cur_end - cur_start + 1
            cur_start, cur_end = next_start, next_end

    res += cur_end - cur_start + 1
    print(f"part2: {res=}")


part2()
