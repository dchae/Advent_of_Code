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

let path = filepath("input.txt");
// path = filepath("exinput.txt");

// Part 1
let [rules, updates] = readFileSync(path, "utf-8").trim().split("\n\n");
updates = updates.split("\n").map((line) => line.split(",").map(Number));

function toAdjList(pairs) {
  return pairs.reduce((adjList, [a, b]) => {
    if (!adjList.has(a)) adjList.set(a, new Set());
    adjList.get(a).add(b);
    return adjList;
  }, new Map());
}

let mustAppearAfter = toAdjList(
  rules.split("\n").map((str) => str.split("|").map(Number)),
);

// brute force check whether each update has its pages in the correct order
function inOrder(update, adjList) {
  let indices = new Map(update.map((v, i) => [v, i]));

  return adjList.entries().every(([key, afters]) => {
    // for each key that appears in the update,
    //  for each value, if it appears in the update, it must appear after key
    let keyIdx = indices.get(key);
    if (keyIdx === undefined) return true;

    return afters.values().every((page) => {
      let pageIdx = indices.get(page);
      return pageIdx === undefined || pageIdx > keyIdx;
    });
  });
}

let validUpdates = updates.filter((update) => inOrder(update, mustAppearAfter));
let middleNumbers = validUpdates.map((nums) => nums.at(nums.length / 2));
console.log(middleNumbers.sum());

// Part 2
function comparator(a, b) {
  return mustAppearAfter.get(a)?.has(b) ? 1 : -1;
}

let invalidUpdates = updates.filter(
  (update) => !inOrder(update, mustAppearAfter),
);

invalidUpdates.forEach((update) => update.sort(comparator));

let middleNumbersFixed = invalidUpdates.map((numbers) =>
  numbers.at(numbers.length / 2),
);

console.log(middleNumbersFixed.sum());
