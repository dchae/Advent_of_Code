const { readFileSync } = require("fs");
const { join, resolve } = require("path");

Object.defineProperty(Array.prototype, "sum", {
  value: function sum(callback = (x) => x) {
    return this.reduce((acc, ...args) => acc + callback(...args), 0);
  },
  writable: true,
  configurable: true,
});

function toTally(iter) {
  return iter.reduce(
    (tally, x) => tally.set(x, (tally.get(x) ?? 0) + 1),
    new Map(),
  );
}

function transpose(arr) {
  return arr[0].map((_, j) => arr.map((_, i) => arr[i][j]));
}

function rotate(grid) {
  return grid[0].map((_, j) => grid.map((_, i) => grid[i][j]).reverse());
}

function count(iter, condition) {
  return iter.reduce((count, x) => count + (condition(x) ? 1 : 0), 0);
}

function timeIt(func, ...args) {
  const startTime = performance.now();
  let res = func(...args);
  const endTime = performance.now();

  console.log(`${func.name}: ${endTime - startTime} ms`);
  return res;
}

module.exports = {
  readFileSync,
  toTally,
  transpose,
  join,
  resolve,
  rotate,
  count,
  timeIt,
};
