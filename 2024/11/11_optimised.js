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

// function count(iter, condition) {
//   return iter.reduce((count, x) => count + (condition(x) ? 1 : 0), 0);
// }

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

function count(x, n, memo) {
  if (memo[x] && memo[x][n]) return memo[x][n];
  if (!n) return 1;

  if (!x) return ((memo[x] ??= {})[n] = count(1, n - 1, memo));

  let len = (Math.log10(x) | 0) + 1;
  if (len % 2 === 0) {
    let div = 10 ** (len / 2);
    let [left, right] = [Math.floor(x / div), x % div];

    return ((memo[x] ??= {})[n] = [left, right].reduce(
      (acc, x) => acc + count(x, n - 1, memo),
      0,
    ));
  }

  return ((memo[x] ??= {})[n] = count(x * 2024, n - 1, memo));
}

function main(input) {
  let stones = input.split(" ").map(Number);

  const memo = {};
  let part1 = stones.map((x) => count(x, 25, memo)).sum();
  let part2 = stones.map((x) => count(x, 75, memo)).sum();

  console.log(part1);
  console.log(part2);
}

timeIt(main, input);
