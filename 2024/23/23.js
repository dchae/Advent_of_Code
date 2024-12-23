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
Input:
Output:
*/

// Part 1
let input = readFileSync(path, "utf-8").trim();

function getDAG(lines) {
  let nodes = new Map();
  for (let line of lines) {
    let [a, b] = line.split("-");
    nodes.set(a, nodes.get(a) ?? new Set());
    nodes.get(a).add(b);
    nodes.set(b, nodes.get(b) ?? new Set());
    nodes.get(b).add(a);
  }
  return nodes;
}

function getSetsOfThree(dag) {
  let nodes = [...dag.keys()];
  // find all unique sets of three nodes where each node is connected to the other two
  // for each node a
  //  for each node b connected to node a
  //    for each node c connected to node b
  //      if node b is connected to node a, add set (a, b, c)
  let sets = new Set();
  for (let a of nodes) {
    for (let b of dag.get(a)) {
      for (let c of dag.get(b)) {
        if (dag.get(c).has(a)) sets.add([a, b, c].sort().join());
      }
    }
  }
  return sets;
}

function part1(input) {
  let lines = input.split("\n");
  let dag = getDAG(lines);

  let setsOfThree = getSetsOfThree(dag);
  console.log(
    [...setsOfThree.values()].filter((key) => /(^|,)t/.test(key)).length,
  );
}

timeIt(part1, input);

// Part 2
function findLargestSet(dag, cur, connected = new Set()) {
  if (connected.has(cur)) return connected;
  // if every node in connected has a connection to cur
  if (![...connected.values()].every((node) => dag.get(node).has(cur)))
    return connected;
  connected.add(cur);
  for (let next of dag.get(cur)) {
    findLargestSet(dag, next, connected);
  }

  return connected;
}

function part2(input) {
  let lines = input.split("\n");
  let dag = getDAG(lines);
  // find all sets of computers for which each computer is connected to rest
  //  for each node, find the largest set that it's a part of

  let nodes = [...dag.keys()];
  let best = new Set();
  for (let a of nodes) {
    let largestSet = findLargestSet(dag, a);
    if (largestSet.size > best.size) best = largestSet;
  }

  let password = [...best.values()].sort().join();

  console.log(password);
}

timeIt(part2, input);
