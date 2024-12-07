const {
  readFileSync,
  toTally,
  join,
  resolve,
  transpose,
} = require("../../js_modules/helpers.js");

function filepath(filename, subfolder = "") {
  return join(resolve(__dirname), subfolder, filename);
}

let path = filepath("input.txt");
// path = filepath("exinput.txt");
let lines = readFileSync(path, "utf-8").trim().split("\n");

// Part 1

let reports = lines.map((line) => line.match(/\d+/g).map(Number));

function isSafe(nums) {
  let deltas = nums.slice(0, nums.length - 1).map((x, i) => nums[i + 1] - x);
  let max = Math.max(...deltas);
  let min = Math.min(...deltas);
  return Math.max(...[max, min].map(Math.abs)) <= 3 && max * min > 0;
}

function count(iter, condition) {
  return iter.reduce((count, x) => count + (condition(x) ? 1 : 0), 0);
}

console.log(count(reports, isSafe));
// Part 2

function isSafeDampened(nums) {
  return nums.some((x, i) =>
    isSafe(nums.slice(0, i).concat(nums.slice(i + 1))),
  );
}

console.log(count(reports, isSafeDampened));
