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

// Part 1
/*
Input: array of ints
Output: number of ints after n blinks

a stone is only added when it has an even number of digits

0, 2, 4 increase the digit count by an even number
6 and 8 increase the digits count by an odd number

*/

let input = readFileSync(path, "utf-8").trim();

function blink(tally) {
  let newTally = new Map();

  for (let [num, count] of tally) {
    if (num === 0) {
      newTally.set(1, (newTally.get(1) ?? 0) + count);
      continue;
    }

    let numStr = String(num);
    if (numStr.length % 2 === 0) {
      [numStr.slice(0, numStr.length / 2), numStr.slice(numStr.length / 2)]
        .map(Number)
        .forEach((x) => newTally.set(x, (newTally.get(x) ?? 0) + count));
    } else {
      newTally.set(num * 2024, (newTally.get(num * 2024) ?? 0) + count);
    }
  }

  return newTally;
}

function part1(input) {
  let tally = input
    .split(" ")
    .reduce((tally, x) => tally.set(+x, (tally.get(+x) ?? 0) + 1), new Map());
  for (let i = 0; i < 25; i++) tally = blink(tally);
  console.log(tally.values().reduce((a, b) => a + b, 0));

  // part 2
  for (let i = 0; i < 50; i++) tally = blink(tally);
  console.log(tally.values().reduce((a, b) => a + b, 0));
}

timeIt(part1, input);
