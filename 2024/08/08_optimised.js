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

const grid = readFileSync(path, "utf-8")
  .trim()
  .split("\n")
  .map((line) => line.split(""));

function getAntennas(grid) {
  const antennas = new Map();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] !== ".") {
        const frequency = grid[y][x];
        if (!antennas.has(frequency)) antennas.set(frequency, new Set());

        antennas.get(frequency).add(JSON.stringify([x, y]));
      }
    }
  }

  return antennas;
}

function* eachPair(antennas) {
  for (let [, posKeys] of antennas) {
    for (let posKey of posKeys) {
      let [x1, y1] = JSON.parse(posKey);
      for (let posKey2 of posKeys) {
        if (posKey === posKey2) continue;
        let [x2, y2] = JSON.parse(posKey2);

        yield [x1, y1, x2, y2];
      }
    }
  }
}

function getVector(x1, y1, x2, y2) {
  return [x2 - x1, y2 - y1];
}

function addAntinode(seen, [x1, y1, x2, y2]) {
  let [vx, vy] = getVector(x1, y1, x2, y2);
  let [x3, y3] = [x2 + vx, y2 + vy];

  if (grid[y3] && grid[y3][x3]) seen.add(JSON.stringify([x3, y3]));
  return seen;
}

function part1(grid, collect) {
  let antennas = getAntennas(grid);
  let antinodes = eachPair(antennas).reduce(collect, new Set());

  console.log(antinodes.size);
}

// part1(grid, addAntinode);
timeIt(part1, grid, addAntinode);

// Part 2
function traverseLine(x, y, vx, vy, seen) {
  while (grid[y] && grid[y][x]) {
    seen.add(JSON.stringify([x, y]));
    x += vx;
    y += vy;
  }
}

function addResonantAntinodes(seen, [x1, y1, x2, y2]) {
  let [vx, vy] = getVector(x1, y1, x2, y2);
  traverseLine(x1, y1, vx, vy, seen);
  traverseLine(x1, y1, -vx, -vy, seen);

  return seen;
}

function part2(grid) {
  part1(grid, addResonantAntinodes);
}

// part2(grid);
timeIt(part2, grid);

// function gcd(a, b) {
//   return b ? gcd(b, a % b) : a;
// }
//
// function simpleVector(...args) {
//   const [vx, vy] = getVector(...args);
//   const common = gcd(vx, vy);
//
//   return [vx / common, vy / common];
// }
