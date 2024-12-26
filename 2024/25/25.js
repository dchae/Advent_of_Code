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

-- DS --
locks
keys
lockHeights
keyHeights
*/

// Part 1
let input = readFileSync(path, "utf-8").trim();
const MAXHEIGHT = 7;

function findPairs(lockHeights, keyHeights) {
  let res = [];
  for (let lockHeight of lockHeights) {
    for (let keyHeight of keyHeights) {
      let sums = lockHeight.map((x, i) => x + keyHeight[i]);
      if (sums.every((x) => x <= MAXHEIGHT)) res.push([lockHeight, keyHeight]);
    }
  }
  return res;
}

function part1(input) {
  let schematics = input
    .split("\n\n")
    .map((block) => block.split("\n").map((line) => line.split("")));
  let [locks, keys] = ["#", "."].map((c) => {
    return schematics.filter((arr) => arr[0].every((v) => v === c));
  });

  let [lockHeights, keyHeights] = [locks, keys].map((matrix) =>
    matrix.map((key) =>
      transpose(key).map((line) => count(line, (x) => x === "#")),
    ),
  );

  let pairs = findPairs(lockHeights, keyHeights);
  console.log(pairs.length);
}

timeIt(part1, input);
