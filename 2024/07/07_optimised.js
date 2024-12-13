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

// The optimised evalsTo algorithm works from the back of the "equation",
// attempting to determine whether we can reach the current target by performing
// some operation on the last number.
// This allows us to pare more paths since we can immediately detect:
// - whether we can concat to target (if target ends with the current number)
// - whether we can multiply to target (if target divisible by current number).
// This version runs part 2 in sub 7ms on my machine, about 43 times faster
// than my original solution.

// Part 1
let lines = readFileSync(path, "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.match(/\d+/g).map(Number));

const OPS = [(a, b) => (a % b === 0 ? a / b : -1), (a, b) => a - b];

function evalsTo(nums, cur, i = nums.length - 1) {
  if (!i || cur < 0) return cur === nums[0];

  return OPS.some((func) => evalsTo(nums, func(cur, nums[i]), i - 1));
}

function part1(lines) {
  let filtered = lines
    .filter(([target, ...nums]) => evalsTo(nums, target))
    .map(([total]) => total);

  console.log(filtered.sum());
}

part1(lines);

// Part 2

function part2(lines) {
  let unconcat = (x, y) => {
    let [sub, yMag] = [x - y, 10 ** (Math.floor(Math.log10(y)) + 1)];
    return sub % yMag ? -1 : sub / yMag;
  };

  OPS.push(unconcat);
  part1(lines);
}

const startTime = performance.now();
part2(lines);

const endTime = performance.now();
console.log(`time: ${endTime - startTime} ms`);
