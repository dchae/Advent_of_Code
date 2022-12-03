inputfilename = r"2021/day16/input.txt"
with open(inputfilename) as inputfile:
    hex = inputfile.readline()
    bits = int(hex, base=16)
    bits = bin(bits)[2:].zfill(len(hex * 4))


def decode(bits: str, parsed: list):
    version, id, subpackets = bits[0:3], bits[3:6], bits[6:]
    version = int(version, 2)
    id = int(id, 2)
    if id == 4:
        literal_val = []
        i = 0
        while True:
            literal_val.append(subpackets[i + 1 : i + 5])
            if int(subpackets[i], 2) == 0:
                subpackets = subpackets[i + 5 :]
                break
            i += 5
        parsed_subpacket = {
            "ver": version,
            "id": id,
            "val": int("".join(literal_val), 2),
        }
        parsed.append(parsed_subpacket)
        return subpackets
    else:
        parsed_subpacket = {
            "ver": version,
            "id": id,
            "val": [],
        }
        len_type_id = int(subpackets[0], 2)
        if len_type_id == 1:
            subpacket_count, subpackets = int(subpackets[1:12], 2), subpackets[12:]
            for _ in range(subpacket_count):
                subpackets = decode(subpackets, parsed_subpacket["val"])
        else:
            subpacket_length, subpackets = int(subpackets[1:16], 2), subpackets[16:]
            lim = len(subpackets) - subpacket_length
            while len(subpackets) > lim:
                subpackets = decode(subpackets, parsed_subpacket["val"])

        parsed.append(parsed_subpacket)
        return subpackets


parsed = []
decode(bits, parsed)
print(parsed)


def param_sum(packet, param):
    if isinstance(packet["val"], int):
        return packet[param]
    else:
        return packet[param] + sum(param_sum(packet, param) for packet in packet["val"])


# ver_sum = sum(param_sum(packet, "ver") for packet in parsed)
# print(f"Answer: {ver_sum}")


def op(id: int, values: list[int]):
    match id:
        case 0:
            return sum(values)
        case 1:
            prod = 1
            for x in values:
                prod *= x
            return prod
        case 2:
            return min(values)
        case 3:
            return max(values)
        case 5:
            return int(values[0] > values[1])
        case 6:
            return int(values[0] < values[1])
        case 7:
            return int(values[0] == values[1])


def execute(packet):
    if packet["id"] == 4:
        return packet["val"]
    else:
        return op(packet["id"], [execute(newpacket) for newpacket in packet["val"]])


res = execute(parsed[0])
print(res)
