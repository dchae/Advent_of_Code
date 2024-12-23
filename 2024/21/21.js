const {
  readFileSync,
  toTally,
  join,
  resolve,
  transpose,
  rotate,
} = require("../../js_modules/helpers.js");

/* eslint no-sparse-arrays: "off" */

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
keypad code
Output:

-- DS --
string (keypad code)
input 1: shortest sequence of inputs to input the code
input 2: shortest sequence of inputs to input input 1
input 3: shortest sequence of inputs to input input 2
complexity => shortest sequence length * numeric part of code

-- Algo --
get shortestPaths for every position on keypad to every other position on keypad
get shortestPaths for every position on dpad to every other position on dpad

*/

// Part 1
let input = readFileSync(path, "utf-8").trim();

const DPAD = {
  "-1,0": "^",
  "1,0": "v",
  "0,-1": "<",
  "0,1": ">",
};

const DIRS = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

// dfs to find the shortest sequence from start to every button
function dfs(grid, [y, x], path = "", paths = new Map()) {
  if (!grid[y] || !grid[y][x]) return paths;

  let key = grid[y][x];
  if (paths.has(key)) {
    if (paths.get(key)[0].length < path.length) return paths;
    else paths.get(key).push(path);
  } else paths.set(key, [path]);

  for (let [vy, vx] of DIRS) {
    // only change directions once
    let newPath = path + DPAD[[vy, vx].join()];
    if (new Set(newPath).size <= 2) dfs(grid, [y + vy, x + vx], newPath, paths);
  }

  return paths;
}

function findPos(grid, callback) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (callback(grid[y][x])) return [y, x];
    }
  }
  return [-1, -1];
}

function getPaths(grid) {
  let costs = new Map();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let button = grid[y][x];
      if (!button) continue;
      let pos = findPos(grid, (v) => v === button);
      let costsFromPos = dfs(grid, pos);
      costs.set(button, costsFromPos);
    }
  }

  return costs;
}

function getSequences(paths, code, i = 0, seq = "", res = []) {
  if (i === code.length) {
    res.push(seq);
    return res;
  }

  let [cur, next] = [code[i - 1] ?? "A", code[i]];
  let nextPaths = paths.get(cur).get(next);
  for (let nextPath of nextPaths)
    getSequences(paths, code, i + 1, seq + nextPath + "A", res);

  return res;
}

function findMinSequenceLen(paths, sequence, n = 2, memo) {
  // sequence is some string like: '<A^A^^>AvvvA'
  // we are trying to find the shortest length of
  // the expansion of sequence n times
  const key = [sequence, n].join();
  if (memo.has(key)) return memo.get(key);
  if (n === 0) return sequence.length;

  let expansions = getSequences(paths, sequence);

  let best = Infinity;
  for (let expansion of expansions) {
    let subsequences = expansion.match(/\S*?A/g);
    let len = 0;
    for (let subsequence of subsequences)
      len += findMinSequenceLen(paths, subsequence, n - 1, memo);
    if (len < best) best = len;
  }

  memo.set(key, best);
  return best;
}

function part1(input, n) {
  const keypad = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    [, "0", "A"],
  ];
  const dpad = [
    [, "^", "A"],
    ["<", "v", ">"],
  ];
  const keypadPaths = getPaths(keypad);
  const dpadPaths = getPaths(dpad);
  const memo = new Map();

  const codes = input.split("\n");

  let complexities = [];
  for (let code of codes) {
    let numeric = parseInt(code, 10);
    let dpadSequences = getSequences(keypadPaths, code);

    let best = Infinity;
    for (let seq of dpadSequences) {
      let candidate = findMinSequenceLen(dpadPaths, seq, n, memo);
      if (candidate < best) best = candidate;
    }

    let complexity = numeric * best;
    complexities.push(complexity);
  }

  console.log(complexities.sum());
}

timeIt(part1, input, 2);

// Part 2
timeIt(part1, input, 25);
