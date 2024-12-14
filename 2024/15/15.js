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
path = filepath("exinput.txt");

/*
Input:
Output:
*/

// Part 1
let lines = readFileSync(path, "utf-8").trim().split("\n");

function part1(lines) {}

timeIt(part1, lines);

// Part 2
function part2(lines) {}

timeIt(part2, lines);
