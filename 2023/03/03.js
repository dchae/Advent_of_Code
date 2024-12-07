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

function count(iter, condition) {
  return iter.reduce((count, x) => count + (condition(x) ? 1 : 0), 0);
}

let path = filepath("input.txt");
path = filepath("exinput.txt");

// Part 1
let lines = readFileSync(path, "utf-8").trim().split("\n");
let data = lines.map((line) =>
  [...line.matchAll(/\d+/g)].map((match) => [match.index, Number(match[0])]),
);

function getAdjacentCells(grid, row, col) {
  let res = [];
  for (let rowOffset = -1; rowOffset < 2; rowOffset++) {
    for (let colOffset = -1; colOffset < 2; colOffset++) {
      res.push(grid[row + rowOffset][col + colOffset]);
    }
  }

  return res;
}

// Part 2
