const {
  readFileSync,
  toTally,
  join,
  resolve,
  transpose,
  rotate,
  count,
  timeIt,
} = require("../../js_modules/helpers.js");

function filepath(filename, subfolder = "") {
  return join(resolve(__dirname), subfolder, filename);
}

let path = filepath("input.txt");
// path = filepath("exinput.txt");

/*
Input: list of all robot positions and velocities
Output:

- Robots are in a grid with width 101 and height 103
- For the example, grid is 11 * 7
- Multiple robots can occupy a single cell
- when a robot would exit the grid, they teleport to the other side
  - jumping to the other side counts as 1 unit of movement

-- Algo --
- get all robotPositions
- for each robot, simulate its position after 100 seconds
- count number of robots in each quadrant
  - robots exactly in the middle do not belong to any quadrant
- multiply number of robots in each quadrant together to get safety factor
*/

// Part 1
let lines = readFileSync(path, "utf-8").trim().split("\n");
// const WIDTH = 11;
// const HEIGHT = 7;
const WIDTH = 101;
const HEIGHT = 103;

function updateRobotAfterNSeconds(robot, n) {
  for (let i = 0; i < n; i++) {
    robot.p[0] = (robot.p[0] + robot.v[0] + WIDTH) % WIDTH;
    robot.p[1] = (robot.p[1] + robot.v[1] + HEIGHT) % HEIGHT;
  }
}

function getQuadrants(robots) {
  const quadrants = [[], [], [], []];
  const xMid = Math.floor(WIDTH / 2);
  const yMid = Math.floor(HEIGHT / 2);

  for (let robot of robots) {
    // if robot on center line, continue
    if (robot.p[0] === xMid || robot.p[1] === yMid) continue;

    if (robot.p[1] < yMid) {
      if (robot.p[0] < xMid) {
        quadrants[0].push(robot);
      } else {
        quadrants[1].push(robot);
      }
    } else if (robot.p[0] < xMid) {
      quadrants[2].push(robot);
    } else {
      quadrants[3].push(robot);
    }
  }

  return quadrants;
}

function getSafetyFactor(robots) {
  const quadrants = getQuadrants(robots);
  return quadrants.map((q) => q.length).reduce((a, x) => a * x);
}

function part1(lines) {
  const robots = lines.map((line) => {
    const [p, v] = line.split(" ").map((s) => s.match(/-?\d+/g).map(Number));
    return { p, v };
  });

  robots.forEach((robot) => updateRobotAfterNSeconds(robot, 100));
  console.log(getSafetyFactor(robots));
}

timeIt(part1, lines);

// Part 2
function printGrid(robots) {
  const [EMPTY, MARKER] = [".", "#"];
  const grid = Array.from(Array(HEIGHT), () => new Array(WIDTH).fill(EMPTY));
  for (let robot of robots) grid[robot.p[1]][robot.p[0]] = MARKER;

  console.log(grid.map((line) => line.join("")).join("\n"));
}

function part2(lines, lim) {
  const robots = lines.map((line) => {
    const [p, v] = line.split(" ").map((s) => s.match(/-?\d+/g).map(Number));
    return { p, v };
  });

  let best = Infinity;
  for (let i = 1; i <= lim; i++) {
    robots.forEach((robot) => updateRobotAfterNSeconds(robot, 1));

    const safetyFactor = getSafetyFactor(robots);
    if (safetyFactor < best) {
      best = safetyFactor;
      printGrid(robots);
      console.log("i: ", i);
    }
  }
}

timeIt(part2, lines, 10000);
