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
// path = filepath("exinput3.txt");

/*
Input:
- grid representing a map of the warehouse
@: robot
#: wall
O: box

- list of movements the robot will attempt to make
Output:

- if the robot attempts to move into box(es)
  - attempt to move the boxes and the robot
    - if movement would cause collision with wall:
      - no movement

-- Algo --
- get grid and moves as arrays
- Simulate the robot's movements
- get the GPSCoordinate of each box
  - 100 * y + x
- get sum of GPSCoordinates for all boxes

*/

const printGrid = (grid) =>
  console.log(grid.map((line) => line.join("")).join("\n"));

// Part 1
let input = readFileSync(path, "utf-8").trim();
const DIRS = { "<": [0, -1], ">": [0, 1], "^": [-1, 0], v: [1, 0] };
const ROBOT = "@";
const WALL = "#";
const BOX = "O";
const BOX_L = "[";
const BOX_R = "]";
const EMPTY = ".";

function getRobotPos(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === ROBOT) return [y, x];
    }
  }
}

const isMoveable = (char) => [ROBOT, BOX, BOX_L, BOX_R].includes(char);

function getBoxes(grid, [y, x], [vy, vx], res = []) {
  while (isMoveable(grid[y][x])) {
    res.push([y, x]);
    [y, x] = [y + vy, x + vx];
  }

  return grid[y][x] === WALL ? [] : res.map(([y, x]) => [[y, x], grid[y][x]]);
}

function moveAll(grid, boxes, [vy, vx]) {
  for (let [[y, x]] of boxes) grid[y][x] = EMPTY;
  for (let [[y, x], val] of boxes) grid[y + vy][x + vx] = val;
}

function execute(grid, move, wide = false) {
  const cur = getRobotPos(grid);
  let boxes =
    wide && move[0]
      ? getWideBoxesVertical(grid, cur, move)
      : getBoxes(grid, cur, move);
  moveAll(grid, boxes, move);
}

const gpsSum = (grid, c = BOX) =>
  grid
    .flatMap((row, y) => row.map((v, x) => (v === c ? y * 100 + x : 0)))
    .sum();

function part1(input) {
  let [grid, moves] = input.split("\n\n");
  grid = grid.split("\n").map((line) => line.split(""));
  moves = moves.match(/\S/g).map((c) => DIRS[c]);

  for (let move of moves) execute(grid, move);
  // printGrid(grid);
  console.log(gpsSum(grid));
}

timeIt(part1, input);

// Part 2
function widenMap(gridStr) {
  return gridStr.replaceAll(/[O#.@]/g, (c) => {
    if (c === BOX) return BOX_L + BOX_R;
    if (c === ROBOT) return ROBOT + EMPTY;
    return c + c;
  });
}

function getWideBoxesVertical(grid, cur, [vy, vx]) {
  let queue = [cur];

  for (let [y, x] of queue) {
    let [y2, x2] = [y + vy, x + vx];

    if (grid[y2][x2] === WALL) return [];
    if ([BOX_L, BOX_R].includes(grid[y2][x2])) {
      queue.push([y2, x2]);
      queue.push([y2, x2 + (grid[y2][x2] === BOX_L ? 1 : -1)]);
    }
  }

  return queue.map(([y, x]) => [[y, x], grid[y][x]]);
}

function part2(input) {
  let [grid, moves] = input.split("\n\n");
  grid = widenMap(grid)
    .split("\n")
    .map((line) => line.split(""));
  moves = moves.match(/\S/g).map((c) => DIRS[c]);

  for (let move of moves) execute(grid, move, true);
  console.log(gpsSum(grid, BOX_L));
}

timeIt(part2, input);
