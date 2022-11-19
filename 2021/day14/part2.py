"""
input: string
output: int

algo:
init insertions hashmap; pairs => insertion char
init hashmap pairs_counter[pair] => count, default value = 0
populate counter hashmap with template
    for two char slice in template:
        counter[pair] += 1
do step times:
    for key in pairs_counter
        if pairs_counter[key] > 0 and key in insertions:
            insert = insertions[key]
            pairs_counter[key[0] + insert] += pairs_counter[key]
            pairs_counter[insert + key[1]] += pairs_counter[key]
            pairs_counter[key] = 0
end up with counts of all pairs after n steps
make new element_counter default = 0
for key, value in pairs_counter:
    element_counter[key[0]] += value/2
    element_counter[key[1]] += value/2
return max(element_counter) + min(element_counter)

"""


def init_input(inputfilename):  # init insertions dict
    insertions = {}
    with open(inputfilename) as inputfile:
        lines = inputfile.readlines()
        template = lines[0].strip()
        for line in lines[2:]:
            line = line.strip().split(" -> ")
            insertions[line[0]] = line[1]
    return template, insertions


from collections import defaultdict


def find_answer(steplimit, testcase=False):
    # handle testcase
    if testcase:
        inputfilename = r"2021/day14/exinput1.txt"

    else:
        inputfilename = r"2021/day14/input1.txt"

    template, insertions = init_input(inputfilename)

    # init pairs counter
    pairs_counter = defaultdict(int)
    for i in range(len(template) - 1):
        pairs_counter[template[i : i + 2]] += 1

    # populate pairs counter
    for _ in range(steplimit):
        temp = pairs_counter.copy()
        for key in temp:
            if temp[key] > 0 and key in insertions:
                insert = insertions[key]
                pairs_counter[key[0] + insert] += temp[key]
                pairs_counter[insert + key[1]] += temp[key]
                pairs_counter[key] -= temp[key]

    # generate element counter
    element_counter = defaultdict(int)
    element_counter[template[-1]] += 1
    for key in pairs_counter:
        if pairs_counter[key] > 0:
            element_counter[key[0]] += pairs_counter[key]
    print(element_counter)
    most = max(element_counter.values())
    least = min(element_counter.values())
    print(most - least)


find_answer(40)  # , True)
