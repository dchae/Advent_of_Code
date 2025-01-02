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
  let pos = 0;
  let firstBasementIndex;
  for (let i = 0; i < input.length; i++) {
    let char = input[i];
    pos += char === "(" ? 1 : -1;
    if (pos < 0) firstBasementIndex ??= i + 1;
  }

  console.log(pos, firstBasementIndex);
}

timeIt(part1, input);
