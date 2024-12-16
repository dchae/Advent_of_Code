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
// path = filepath("exinput2.txt");

/*
Input: grid representing a maze

Output:

Rules:
- start on S tile, facing east/right
- need to reach E tile
- each move is one point
- each rotation is 1000 points


-- Algo --
- find path from S to E with minimum score
*/

function printCurPosInGrid(grid, [y, x]) {
  grid = grid.map((row) => row.slice());
  let [sy, sx] = getPos(grid, (v) => v === "S");
  grid[sy][sx] = ".";
  grid[y][x] = "S";

  console.log(grid.map((row) => row.join("")).join("\n"));
}

// Part 1
let input = readFileSync(path, "utf-8").trim();
const DIRS = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

function getPos(grid, callback) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (callback(grid[y][x])) return [y, x];
    }
  }
  return [-1, -1];
}

function dfs(
  grid,
  [y, x],
  dirIdx = 0,
  target = "E",
  score = 0,
  seen = new Map(),
) {
  let key = [y, x].join();

  if (seen.has(key)) {
    if (seen.get(key)[0] <= score) return seen;
  } else {
    seen.set(key, []);
  }

  let [seenScore] = seen.get(key);
  if (!(seenScore < score)) seen.set(key, [score, dirIdx]);
  if (grid[y][x] === target) return seen;

  for (let k of [0, 1, 3]) {
    let i = (dirIdx + k) % 4;
    let [vy, vx] = DIRS[i];
    let [y2, x2] = [y + vy, x + vx];
    let newScore = score + 1 + 1000 * !!k;
    if (grid[y2][x2] !== "#") dfs(grid, [y2, x2], i, target, newScore, seen);
  }

  return seen;
}

function part1(input) {
  let grid = input.split("\n").map((line) => line.split(""));
  let startPos = getPos(grid, (v) => v === "S");
  let endPos = getPos(grid, (v) => v === "E");
  let scores = dfs(grid, startPos, 0);
  let best = scores.get(endPos.join())[0];
  console.log(best);
}

timeIt(part1, input);

// Part 2
function getTiles(grid, scores, scoresReverse, best) {
  let tiles = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      let key = [y, x].join();

      if (!(scores.has(key) && scoresReverse.has(key))) continue;
      let [fScore, fDirIdx] = scores.get(key);
      let [rScore, rDirIdx] = scoresReverse.get(key);

      let comp = (Math.abs(fDirIdx - rDirIdx) !== 2) * 1000;
      if (fScore + rScore + comp === best) tiles.push([y, x]);
    }
  }
  return tiles;
}

function part2(input) {
  let grid = input.split("\n").map((line) => line.split(""));
  let startPos = getPos(grid, (v) => v === "S");
  let endPos = getPos(grid, (v) => v === "E");
  let scores = dfs(grid, startPos, 0);
  let scoresReverse = dfs(grid, endPos, 2, "S");
  let best = scores.get(endPos.join())[0];
  let tiles = getTiles(grid, scores, scoresReverse, best);
  // for (let [y, x] of tiles) grid[y][x] = "O";
  // console.log(grid.map((line) => line.join("")).join("\n"));
  console.log(tiles.length);
}

timeIt(part2, input);
