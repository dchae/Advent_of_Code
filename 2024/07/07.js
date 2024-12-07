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

/*
-- Problem --
Input: string representing equation
Output: boolean
- if we can insert operators (+, *) between the numbers to result in test value

-- DS --
target value (int), array of nums (int)

-- Algo --
check all possible combinations with backtracking

*/

// Part 1
let lines = readFileSync(path, "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.match(/\d+/g).map(Number));

const OPS = [(a, b) => a + b, (a, b) => a * b];

function evalsTo(nums, target, i = 1, cur = nums[0]) {
  if (i === nums.length) return cur === target;

  return OPS.some((func) => evalsTo(nums, target, i + 1, func(cur, nums[i])));
}

function part1(lines) {
  let filtered = lines
    .filter(([target, ...equation]) => evalsTo(equation, target))
    .map(([total]) => total);

  console.log(filtered.sum());
}

part1(lines);

// Part 2

function part2(lines) {
  OPS.push((x, y) => +("" + x + y));
  part1(lines);
}

part2(lines);
