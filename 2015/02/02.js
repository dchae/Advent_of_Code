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

function part1(input) {
  let dimensions = input.split("\n").map((line) => line.split("x").map(Number));
  let total = 0;
  let totalRibbon = 0;

  for (let [l, w, h] of dimensions) {
    let sideAreas = [l * w, l * h, w * h];
    let slack = Math.min(...sideAreas);
    let requiredPaper = sideAreas.reduce((acc, x) => acc + x * 2, 0) + slack;
    total += requiredPaper;

    let bowLength = l * w * h;
    let requiredRibbon =
      [l, w, h]
        .sort((a, b) => a - b)
        .slice(0, 2)
        .reduce((acc, x) => acc + x * 2, 0) + bowLength;
    totalRibbon += requiredRibbon;
  }

  console.log(total, totalRibbon);
}

timeIt(part1, input);

// Part 2
function part2(input) {}

timeIt(part2, input);
