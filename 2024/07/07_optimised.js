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

const OPS = [(a, b) => (a % b === 0 ? a / b : -1), (a, b) => a - b];

function evalsTo(nums, cur, i = nums.length - 1) {
  if (!i) return cur === nums[0];
  if (cur < 0) return false;

  return OPS.some((func) => evalsTo(nums, func(cur, nums[i]), i - 1));
}

function part1(lines) {
  let filtered = lines
    .filter(([target, ...equation]) => evalsTo(equation, target))
    .map(([total]) => total);

  console.log(filtered.sum());
}

// part1(lines);

// Part 2

function part2(lines) {
  let unconcat = (x, y) => {
    let [sub, yMag] = [x - y, 10 ** (Math.floor(Math.log10(y)) + 1)];
    return sub > 0 && sub % yMag === 0 ? sub / yMag : -1;
  };

  OPS.push(unconcat);
  part1(lines);
}

const startTime = performance.now();
part2(lines);

const endTime = performance.now();
console.log(`time: ${endTime - startTime} ms`);
