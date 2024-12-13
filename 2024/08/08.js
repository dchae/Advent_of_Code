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

function getAntennas(grid) {
  let antennas = new Map();
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] !== ".") {
        antennas.set(JSON.stringify([row, col]), grid[row][col]);
      }
    }
  }

  return antennas;
}

function countGrid(grid, condition) {
  let count = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (condition(row, col, grid)) count++;
    }
  }

  return count;
}

function getVector(x1, y1, x2, y2) {
  return [x2 - x1, y2 - y1];
}

function isAntinode(row, col, antennas) {
  return antennas.entries().some(([posKey, frequency]) => {
    let [x1, y1] = JSON.parse(posKey);
    if (row === x1 && col === y1) return false;

    let [vx, vy] = getVector(row, col, x1, y1);
    let posKey2 = JSON.stringify([x1 + vx, y1 + vy]);
    return antennas.get(posKey2) === frequency;
  });
}

function part1(lines) {
  let grid = lines.map((line) => line.split(""));
  let antennas = getAntennas(grid);
  let count = countGrid(grid, (row, col) => isAntinode(row, col, antennas));
  console.log(count);
}

part1(lines);

// Part 2
function gcd(a, b) {
  return b ? gcd(b, a % b) : a;
}

function simplifyVector(numerator, denominator) {
  const factor = gcd(numerator, denominator);
  return [numerator / factor, denominator / factor];
}

function isAntinodeResonant(row, col, antennas) {
  return antennas.entries().some(([posKey, frequency]) => {
    let [x1, y1] = JSON.parse(posKey);

    let [vx, vy] = simplifyVector(...getVector(row, col, x1, y1));
    // if current pos is an antenna,
    // return true if there is at least one other antenna of same freq
    return antennas.entries().some(([posKey2, frequency2]) => {
      if (posKey === posKey2 || frequency2 !== frequency) return false;
      let [x2, y2] = JSON.parse(posKey2);
      let [vx2, vy2] = simplifyVector(...getVector(x2, y2, x1, y1));
      return (vx === 0 && vy === 0) || (vx === vx2 && vy === vy2);
    });
  });
}

function part2(lines) {
  let grid = lines.map((line) => line.split(""));
  let antennas = getAntennas(grid);
  // console.log(antennas);
  let count = countGrid(grid, (row, col) =>
    isAntinodeResonant(row, col, antennas),
  );
  console.log(count);
}

part2(lines);
