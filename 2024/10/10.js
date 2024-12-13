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
let input = readFileSync(path, "utf-8").trim();
let grid = input.split("\n").map((line) => line.split("").map(Number));

function dfs(grid, row, col, target = 0, seen = []) {
  if (grid[row] === undefined || grid[row][col] !== target) return seen;
  if (target === 9) return seen.push([row, col].join()), seen;

  for (let offset = -1; offset < 2; offset += 2) {
    dfs(grid, row + offset, col, target + 1, seen);
    dfs(grid, row, col + offset, target + 1, seen);
  }

  return seen;
}

function part1(grid) {
  let scores = grid.flatMap((_, row) =>
    grid[row].map((_, col) => new Set(dfs(grid, row, col)).size),
  );
  console.log(scores.sum());
}

// part1(grid);
timeIt(part1, grid);

// Part 2
function part2(grid) {
  let ratings = grid.flatMap((_, row) =>
    grid[row].map((_, col) => dfs(grid, row, col).length),
  );
  console.log(ratings.sum());
}

// part2(grid);
timeIt(part2, grid);
