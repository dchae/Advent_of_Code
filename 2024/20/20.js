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
- matrix representing map of the racetrack
Output:
- list of cheats and the steps the cheat saves

-- DS --
string
=> matrix
=> map {cheatStart,cheatEnd: time saved}
=> int

-- Algo --
- get default best time
- for each wall
  - if wall has "." on both sides for either direction
    - delete it and check best time
      - if it is lower, add to map
- return filtered map count

 get defaultCosts => map of cost to get to each "." cell without cheating
 get all potential cheats (start, end positions: cost)
  - for each cheat
    - the amount of time saved is: (cost to get from cheatStart to cheatEnd - cheatCost)

 Helper
 finding a cheat is just finding the shortest path from A to B
  - where A is a point on the path and B is another point on the path
  - and the shortest path is less than limit
  - since we can ignore walls, the shortest path is always abs(y2 - y1) + abs(x2 - x1)

  - we have to get to cheat start via the optimal path
    - cost to get to cheat start is known
  - we have to get from cheat end to end via optimal path
    - cost from cheat end to end is known
  - do we need to find cheats from positions with higher cost to positions with lower cost?
    - NO

 - cheatStarts is array of positions that a cheat can start from
  - just use baselineCosts keys
 findAllCheats(grid, pathPositions, lim)
 - init cheats = new Map()
 - for each position cheatStart in pathPositions
  - for each position cheatEnd in pathPositions
    - if cheatEnd === cheatStart, continue
    - find cost of shortest path from cheatStart to cheatEnd
      - abs(y2 - y1) + abs(x2 - x1)
    - if cost is greater than lim, continue
    - cheats[cheatstart, cheatEnd] === cost

   could be more efficient if we only check squares within lim distance
*/

function logPath(grid, pathPositions) {
  grid = grid.map((row) => row.slice());
  pathPositions.forEach((key, i) => {
    let [y, x] = key.split(",").map(Number);
    grid[y][x] = i;
  });

  console.log(
    grid
      .map((row) => row.map((x) => String(x).padStart(2)).join(""))
      .join("\n"),
  );
}

// Part 1
let input = readFileSync(path, "utf-8").trim();

function findPos(grid, callback) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (callback(grid[y][x])) return [y, x];
    }
  }
  return [-1, -1];
}

function dijkstra(grid, startPos) {
  let [distances, prev] = [new Map([[startPos.join(), 0]]), new Map()];
  let seen = new Set();
  let queue = [startPos];

  let i = 0;
  while (i < queue.length) {
    let [y, x] = queue[i++];
    let curKey = [y, x].join();
    let steps = distances.get(curKey);

    const neighbours = [
      [y + 1, x],
      [y - 1, x],
      [y, x + 1],
      [y, x - 1],
    ];

    for (let [y2, x2] of neighbours) {
      let key = [y2, x2].join();
      if (seen.has(key) || !grid[y2] || !grid[y2][x2] || grid[y2][x2] === "#")
        continue;
      seen.add(key);
      if (!(steps + 1 >= distances.get(key))) {
        prev.set(key, curKey);
        distances.set(key, steps + 1);
      }
      queue.push([y2, x2]);
    }
  }

  return [distances, prev];
}

function findAllCheats(costs, lim) {
  const pathPositions = [...costs.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([k, v]) => k);
  const cheats = new Map();

  for (let i = 0; i < pathPositions.length - 1; i++) {
    const cheatStart = pathPositions[i];
    const [y1, x1] = cheatStart.split(",").map(Number);
    for (let j = i + 1; j < pathPositions.length; j++) {
      const cheatEnd = pathPositions[j];
      const [y2, x2] = cheatEnd.split(",").map(Number);
      const cheatCost = Math.abs(y2 - y1) + Math.abs(x2 - x1);
      if (cheatCost > lim) continue;
      cheats.set([cheatStart, cheatEnd].join(":"), cheatCost);
    }
  }

  return cheats;
}

function getShortestPathLength(prev, key, memo) {
  if (memo.has(key)) return memo.get(key);
  let [startKey, endKey] = key.split(":");
  let count = 0;
  let cur = endKey;
  while (cur !== startKey) {
    count++;
    cur = prev.get(cur);
  }
  memo.set(key, count);
  return count;
}

function part1(input, minSavedTime) {
  const grid = input.split("\n").map((line) => line.split(""));
  let startPos = findPos(grid, (v) => v === "S");
  let [baselineCosts, prev] = dijkstra(grid, startPos);
  const shortestPathLengths = new Map();

  let cheats = findAllCheats(baselineCosts, 2);
  let times = [];
  cheats.entries().forEach(([key, cheatCost]) => {
    const costFromCheatStartToCheatEnd = getShortestPathLength(
      prev,
      key,
      shortestPathLengths,
    );
    const timeSaved = costFromCheatStartToCheatEnd - cheatCost;
    if (timeSaved >= minSavedTime) times.push(timeSaved);
  });

  console.log(times.length);
}

timeIt(part1, input, 100);

// Part 2

function part2(input, minSavedTime) {
  const grid = input.split("\n").map((line) => line.split(""));
  let startPos = findPos(grid, (v) => v === "S");
  let [baselineCosts, prev] = dijkstra(grid, startPos);
  const shortestPathLengths = new Map();

  let cheats = findAllCheats(baselineCosts, 20);
  let times = [];
  cheats.entries().forEach(([key, cheatCost]) => {
    const costFromCheatStartToCheatEnd = getShortestPathLength(
      prev,
      key,
      shortestPathLengths,
    );
    const timeSaved = costFromCheatStartToCheatEnd - cheatCost;
    if (timeSaved >= minSavedTime) times.push(timeSaved);
  });

  console.log(times.length);
}

timeIt(part2, input, 100);
