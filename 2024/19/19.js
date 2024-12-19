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
- towel patterns
- list of designs
Output:

- arrange towels
- towels are marked with a pattern of stripes
- stripes can be w u b r g
- design is a sequence of stripes
  - can be made up of any number of towels

- determine whether a design is possible
*/

// function backtrack(steps, target, path = "") {
//   if (path === target) return true;
//   if (path.length >= target.length) return false;
//   if (path !== target.slice(0, path.length)) return false;
//
//   for (let step of steps) {
//     if (backtrack(steps, target, path + step)) return true;
//   }
//
//   return false;
// }

// Part 1
let input = readFileSync(path, "utf-8").trim();
const MEMO = new Map([["", 1]]); // hold number of paths to key given these patterns

function dfs(steps, target, count = 0) {
  if (MEMO.has(target)) return MEMO.get(target);

  for (let step of steps) {
    if (target.slice(0, step.length) === step)
      count += dfs(steps, target.slice(step.length));
  }

  MEMO.set(target, count);
  return count;
}

function day19(input) {
  let [patterns, designs] = input.split("\n\n").map((s) => s.split(/\n|, /));
  let numberOfPaths = designs.map((design) => dfs(patterns, design));

  console.log(numberOfPaths.filter(Boolean).length);
  // Part 2
  console.log(numberOfPaths.sum());
}

timeIt(day19, input);
