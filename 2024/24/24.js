const {
  readFileSync,
  toTally,
  join,
  resolve,
  transpose,
  rotate,
} = require("../../js_modules/helpers.js");

function filepath(filename, subfolder = "") {
  return join(resolve(__dirname), subfolder, filename);
}

function count(iter, condition) {
  return iter.reduce((count, x) => count + (condition(x) ? 1 : 0), 0);
}

function timeIt(func, ...args) {
  const startTime = performance.now();
  func(...args);
  const endTime = performance.now();

  console.log(`${func.name}: ${endTime - startTime} ms`);
}

let path = filepath("input.txt");
// path = filepath("exinput.txt");
// path = filepath("inputSwapped.txt");

/*
Input:
- initial wire values
  - "x00: 1" means the wire "x00" starts with value 1
- gate connections

-- DS --
wire values, gate connections

all bits on all wires starting with z
  - [z00, z01, z02].reverse()
=> int

*/

// Part 1
let input = readFileSync(path, "utf-8").trim();

function parseInput(input) {
  let [wireStr, gatesStr] = input.split("\n\n");
  let wires = new Map(
    wireStr
      .split("\n")
      .map((line) => line.split(": "))
      .map(([wire, val]) => [wire, +val]),
  );
  let gates = gatesStr.split("\n").map((line) => {
    let [input1, type, input2, output] = line.match(/[^ \->]+/g);
    let inputs = [input1, input2];
    return { inputs, type, output };
  });

  return [wires, gates];
}

const OPS = {
  AND: (a, b) => a & b,
  XOR: (a, b) => a ^ b,
  OR: (a, b) => a | b,
};

function combineWires(wires, id) {
  const keys = [...wires.keys()]
    .filter((key) => key[0] === id)
    .sort()
    .reverse();

  const vals = keys.map((wire) => wires.get(wire));
  const str = vals.join("");
  const int = parseInt(str, 2);
  return int;
}

function processGates(wires, gates) {
  gates = gates.slice();
  while (gates.length) {
    let i = 0;
    while (i < gates.length) {
      let gate = gates[i];
      let inputVals = gate.inputs.map((wire) => wires.get(wire));
      if (inputVals.every((x) => x !== undefined)) {
        let outputVal = OPS[gate.type](...inputVals);
        wires.set(gate.output, outputVal);
        gates.splice(i, 1);
        i--;
      }

      i++;
    }
  }

  return combineWires(wires, "z");
}

function part1(input) {
  let [wires, gates] = parseInput(input);

  let res = processGates(wires, gates);
  console.log(res);
}

// timeIt(part1, input);

// Part 2
// Find swapped wires
// Naive approach (dfs)
// for every pair of gates
//  if swaps < lim (4)
//    swap them
//    recurse
//  else
//    get result
//    check result against expected
//    if match, return the swapped gate

function getExpected(wires) {
  let xNum = combineWires(wires, "x");
  let yNum = combineWires(wires, "y");
  return xNum + yNum;
}

function toDOT(gates) {
  let res = [];
  for (let gate of gates) {
    res.push(
      gate.inputs
        .map(
          (input) => `"${input}" -> "${gate.output}" [label="${gate.type}"];`,
        )
        .join(" "),
    );
  }
  return res.join("\n");
}

function analyse(wires, gates) {
  let expected = getExpected(wires).toString(2);
  let result = processGates(wires, gates).toString(2);
  let diffs = expected
    .split("")
    .map((c, i) =>
      c === result[i] ? "  " : String(expected.length - 1 - i).padEnd(2),
    );
  console.log("expected:", expected.split("").join(" "));
  console.log("  actual:", result.split("").join(" "));
  console.log("   diffs:", diffs.join(""));

  let diffGates = diffs
    .filter((x) => x !== "  ")
    .map((x) => parseInt(x, 10))
    .map((n) => {
      let i = gates.findIndex((gate) => gate.output === "z" + n);
      return gates[i];
    });
  console.log("diffGates:\n", diffGates);
}

function part2(input) {
  let [wires, gates] = parseInput(input);
  // output to graphviz
  console.log(toDOT(gates));
  analyse(wires, gates);
  console.log("fgc,z12,z29,mtj,dgr,vvm,dtv,z37".split(",").sort().join());
}

timeIt(part2, input);
