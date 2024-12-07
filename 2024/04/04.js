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

function getDiags(grid) {
  let res = [];

  const collect = (grid, start = 0) => {
    for (let offset = start; offset < grid[0].length; offset++) {
      res.push(grid.map((row, i) => row[i + offset]));
    }
  };

  collect(grid);
  collect(transpose(grid), 1);
  grid = rotate(grid);

  collect(grid);
  collect(transpose(grid), 1);

  return res.map((row) => row.join(""));
}

let rows = lines;
let grid = rows.map((row) => row.split(""));
let cols = transpose(grid).map((row) => row.join(""));
let diags = getDiags(grid);
let allLines = rows.concat(cols, diags);

function countXMAS(lines) {
  return lines.reduce(
    (acc, line) => acc + (line.match(/X(?=MAS)|S(?=AMX)/g)?.length ?? 0),
    0,
  );
}

console.log(countXMAS(allLines));
// Part 2

function diagMS(grid, row, col) {
  let lr = new Set();
  let rl = new Set();

  for (let offset = -1; offset < 2; offset += 2) {
    if (grid[row + offset] && grid[row + offset][col + offset]) {
      lr.add(grid[row + offset][col + offset]);
      rl.add(grid[row + offset][col + -1 * offset]);
    }
  }

  lr = [...lr.values()].sort().join();
  rl = [...rl.values()].sort().join();
  return lr === rl && lr === "M,S";
}

function isCenterA(grid, row, col) {
  if (grid[row][col] !== "A") return false;

  if (diagMS(grid, row, col)) return true;
  return false;
}

function countMatrix(grid, condition) {
  return grid.reduce(
    (rowSum, _, i) =>
      rowSum +
      grid[0].reduce((colSum, _, j) => colSum + +condition(grid, i, j), 0),
    0,
  );
}

console.log(countMatrix(grid, isCenterA));
