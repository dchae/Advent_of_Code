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
Input: grid
Output:

region: contiguous section of same letters
get each region's area and perimeter
area: number of cells
perimeter: number of sides that do not touch another cell with the same letter

price = area * perimeter
total price = sum of price for every region

-- Algo --
- get every region in the grid
- get area and perimeter for each region
  - for each cell in the region, count number of sides
    that do not touch another cell with the same letter
- get price of region
- sum
*/

// Part 1
let lines = readFileSync(path, "utf-8").trim().split("\n");

function dfs(grid, row, col, cur, region = new Set()) {
  let key = [row, col].join();
  if (!grid[row] || grid[row][col] !== cur || region.has(key)) return region;

  region.add(key);
  for (let offset = -1; offset < 2; offset += 2) {
    dfs(grid, row + offset, col, cur, region);
    dfs(grid, row, col + offset, cur, region);
  }

  return region;
}

function getRegions(grid) {
  let regions = [];
  let seen = new Set();

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      let key = [row, col].join();
      if (seen.has(key)) continue;
      let region = dfs(grid, row, col, grid[row][col]);
      regions.push(region);
      for (let key of region) seen.add(key);
    }
  }

  return regions;
}

function getSideCount(grid, row, col, cur = grid[row][col]) {
  let count = 0;
  for (let offset = -1; offset < 2; offset += 2) {
    if (!grid[row + offset] || grid[row + offset][col] !== cur) count++;
    if (grid[row][col + offset] !== cur) count++;
  }
  return count;
}

function part1(lines) {
  let grid = lines.map((line) => line.split(""));
  let regions = getRegions(grid);
  let prices = regions.map((region) => {
    let area = region.size;
    let perimeter = [...region.values()]
      .map((key) => {
        let [row, col] = key.split(",").map(Number);
        return getSideCount(grid, row, col);
      })
      .sum();
    return area * perimeter;
  });
  console.log(prices.sum());
}

timeIt(part1, lines);

// Part 2
function getVertexCount(grid, region) {
  let count = 0;

  for (let key of region) {
    let [row, col] = key.split(",").map(Number);
    let cur = grid[row][col];

    for (let rowOffset = -1; rowOffset < 2; rowOffset += 2) {
      for (let colOffset = -1; colOffset < 2; colOffset += 2) {
        let rowOffsetCell = (grid[row + rowOffset] ?? [])[col];
        let colOffsetCell = grid[row][col + colOffset];
        let diagOffsetCell = (grid[row + rowOffset] ?? [])[col + colOffset];
        if (rowOffsetCell !== cur && colOffsetCell !== cur) count++;
        else if (
          rowOffsetCell === cur &&
          colOffsetCell === cur &&
          diagOffsetCell !== cur
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

function part2(lines) {
  let grid = lines.map((line) => line.split(""));
  let regions = getRegions(grid);
  let prices = regions.map((region) => {
    let area = region.size;
    let sideCount = getVertexCount(grid, region);
    return area * sideCount;
  });
  console.log(prices.sum());
}

timeIt(part2, lines);
