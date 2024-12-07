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

// Part 1
let lines = readFileSync(path, "utf-8").trim().split("\n");

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function findStartPos(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "^") return [i, j];
    }
  }
  return -1;
}

function traverse(grid, row, col, dirIdx, path = new Set()) {
  if (!grid[row] || !grid[row][col]) return path;

  let key = JSON.stringify([row, col]);
  path.add(key);

  let [rowStep, colStep] = dirs[dirIdx];
  while (grid[row + rowStep] && grid[row + rowStep][col + colStep] === "#") {
    dirIdx++;
    dirIdx %= 4;
    [rowStep, colStep] = dirs[dirIdx];
  }

  return traverse(grid, row + rowStep, col + colStep, dirIdx, path);
}

function part1(lines) {
  let grid = lines.map((line) => line.split(""));
  let [startRow, startCol] = findStartPos(grid);
  let positions = traverse(grid, startRow, startCol, 0);

  console.log(positions.size);
}

part1(lines);

// Part 2
function isCyclic(grid, row, col, dirIdx, path = new Set()) {
  if (!grid[row] || !grid[row][col]) return false;

  let key = [row, col, dirIdx].join();
  if (path.has(key)) return true;
  path.add(key);

  let [rowStep, colStep] = dirs[dirIdx];
  while (grid[row + rowStep] && grid[row + rowStep][col + colStep] === "#") {
    dirIdx++;
    dirIdx %= 4;
    [rowStep, colStep] = dirs[dirIdx];
  }

  return isCyclic(grid, row + rowStep, col + colStep, dirIdx, path);
}

function part2(lines) {
  let grid = lines.map((line) => line.split(""));

  let [startRow, startCol] = findStartPos(grid);
  let positions = [...traverse(grid, startRow, startCol, 0).values()];

  let cyclicBarrierPositions = positions.filter((key) => {
    let [row, col] = JSON.parse(key);
    let old = grid[row][col];
    if (old === "^") return false;
    grid[row][col] = "#";

    let [startRow, startCol] = findStartPos(grid);
    let cyclic = isCyclic(grid, startRow, startCol, 0);

    grid[row][col] = old;

    return cyclic;
  });

  console.log(cyclicBarrierPositions.length);
}

part2(lines);
