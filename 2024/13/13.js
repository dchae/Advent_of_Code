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

/*
Input: string representation of machines
Output: int (number of tokens) representing min cost to maximise targets

cost of A: 3 tokens
cost of B: 1 token

Goal: minimise cost to get to target coordinates

-- DS --
string
=> array of machine objects {moveA, moveB, target}
=> int array representing min costs to get to target
=> sum

-- Algo --
1. get machines
2. get min Costs
  - for each machine:
    - if prize is not reachable, return 0
    - else return min cost to get to prize

*/

// function getMinCost(machine, x = 0, y = 0, cost = 0, memo = new Map()) {
//   let [prizeX, prizeY] = machine.prize;
//   if (x === prizeX && y === prizeY) return cost;
//   if (x > prizeX || y > prizeY) return Infinity;
//
//   let key = [x, y].join();
//   if (memo.has(key)) return memo.get(key);
//
//   let [vxA, vyA] = machine.moveA;
//   let pathACost = getMinCost(machine, x + vxA, y + vyA, cost + 3, memo);
//   let [vxB, vyB] = machine.moveB;
//   let pathBCost = getMinCost(machine, x + vxB, y + vyB, cost + 1, memo);
//   let best = Math.min(pathACost, pathBCost);
//   memo.set(key, best);
//   return best;
// }

// Part 1
let input = readFileSync(path, "utf-8").trim();

function getMachines(input, offset = 0) {
  return input.split("\n\n").map((str) => {
    let [moveA, moveB, prize] = str
      .split("\n")
      .map((s) => s.match(/\d+/g).map(Number));
    prize = prize.map((n) => n + offset);
    return { moveA, moveB, prize };
  });
}

function getMinCost(machine) {
  let [prizeX, prizeY] = machine.prize;
  let [vxA, vyA] = machine.moveA;
  let [vxB, vyB] = machine.moveB;

  // vxA * a + vxB * b = prizeX
  // vyA * a + vyB * b = prizeY
  // a = (prizeX - vxB * b) / vxA
  // b = (prizeY - vyA * a) / vyB
  // a = (prizeX - vxB * (prizeY - vyA * a) / vyB) / vxA
  // a * vxA = prizeX - vxB * (prizeY - vyA * a) / vyB
  // a * vxA * vyB = prizeX * vyB - vxB * (prizeY - vyA * a)
  // a * vxA * vyB = prizeX * vyB - vxB * prizeY + vxB * vyA * a
  // a * vxA * vyB - vxB * vyA * a = prizeX * vyB - vxB * prizeY
  // a * (vxA * vyB - vxB * vyA) = prizeX * vyB - vxB * prizeY
  // a = (prizeX * vyB - vxB * prizeY) / (vxA * vyB - vxB * vyA)

  let a = (prizeX * vyB - vxB * prizeY) / (vxA * vyB - vxB * vyA);
  let b = (prizeY - vyA * a) / vyB;
  return Number.isInteger(a) && Number.isInteger(b) ? 3 * a + b : 0;
}

function part1(input, offset) {
  let machines = getMachines(input, offset);
  let minCosts = machines.map(getMinCost);
  console.log(minCosts.sum());
}

timeIt(part1, input);

// Part 2
function part2(input) {
  part1(input, 10000000000000);
}

timeIt(part2, input);
