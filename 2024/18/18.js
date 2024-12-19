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
Output:
*/

// function dfs(grid, cur, steps = 0, minSteps = new Map()) {
//   let [x, y] = cur;
//   let key = [x, y].join();
//
//   // if we can't step here, return
//   if (!grid[y] || grid[y][x] !== ".") return minSteps;
//
//   // if we've been here before more cheaply, return
//   if (minSteps.has(key) && minSteps.get(key) <= steps) return minSteps;
//
//   // else
//   minSteps.set(key, steps);
//   if (x === grid.length - 1 && y === x) return minSteps;
//
//   for (let offset = -1; offset < 2; offset += 2) {
//     dfs(grid, [x, y + offset], steps + 1, minSteps);
//     dfs(grid, [x + offset, y], steps + 1, minSteps);
//   }
//
//   return minSteps;
// }

// Part 1
let input = readFileSync(path, "utf-8").trim();

function createGrid(length, width = length) {
  return Array.from(new Array(length), () => new Array(width).fill("."));
}

function simulateFallingBytes(grid, bytes, n) {
  for (let i = 0; i < n; i++) {
    let [x, y] = bytes[i];
    grid[y][x] = "#";
  }
}

function dijkstra(grid, startPos) {
  let distances = new Map([[startPos.join(), 0]]);
  let seen = new Set();
  let queue = [startPos];

  let i = 0;
  while (i < queue.length) {
    let [x, y] = queue[i++];
    let curKey = [x, y].join();
    let steps = distances.get(curKey);

    const neighbours = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];

    for (let [x2, y2] of neighbours) {
      if (!grid[y2] || grid[y2][x2] !== ".") continue;
      let key = [x2, y2].join();
      if (seen.has(key)) continue;
      seen.add(key);
      if (!(steps + 1 >= distances.get(key))) distances.set(key, steps + 1);
      queue.push([x2, y2]);
    }
  }

  return distances;
}

function part1(input) {
  let gridLength = 71;
  let grid = createGrid(gridLength);
  let bytes = input.split("\n").map((s) => s.split(",").map(Number));
  simulateFallingBytes(grid, bytes, 1024);

  let startPos = [0, 0];
  let endPos = [gridLength - 1, gridLength - 1];
  let minSteps = dijkstra(grid, startPos);
  // console.log(minSteps);
  // console.log(grid.map((line) => line.join("")).join("\n"));
  console.log(minSteps.get(endPos.join()));
}

timeIt(part1, input);

// Part 2
// find the minimum index of bytes i,
// for which bytes[i] causes minSteps.get(endPos.join()) to be undefined;

function bsearchMin(bytes, condition) {
  let left = 0;
  let right = bytes.length - 1;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    if (condition(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return right;
}

function part2(input) {
  let gridLength = 71;
  let bytes = input.split("\n").map((s) => s.split(",").map(Number));
  let startPos = [0, 0];
  let endPos = [gridLength - 1, gridLength - 1];

  let i = bsearchMin(bytes, (i) => {
    let grid = createGrid(gridLength);
    simulateFallingBytes(grid, bytes, i + 1);
    let minSteps = dijkstra(grid, startPos);
    return !minSteps.has(endPos.join());
  });

  console.log(bytes[i]);
}

timeIt(part2, input);
