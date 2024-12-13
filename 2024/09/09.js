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
- string of digits
  - where each consecutive pair of digits at index i represents
    - block count, free space
    - with id = i / 2
*/

// Part 1
let input = readFileSync(path, "utf-8").trim();

function compact(arr) {
  let [left, right] = [0, arr.length - 1];
  while (left < right) {
    if (arr[left] !== ".") left++;
    else if (arr[right] === ".") right--;
    else [arr[left], arr[right]] = [arr[right], arr[left]];
  }
  return arr;
}

function part1(input) {
  let diskMap = input.split("").map(Number);
  let blocks = diskMap.flatMap((size, i) =>
    new Array(size).fill(i % 2 ? "." : i / 2),
  );
  compact(blocks);
  let checksum = blocks.sum((x, i) => (x === "." ? 0 : i * x));

  console.log(checksum);
}

// part1(input);
timeIt(part1, input);

// Part 2
function compactWhole(files) {
  for (let j = files.length - 1; j >= 0; j--) {
    if (files[j].id === ".") continue;
    let file = files[j];

    for (let i = 0; i < j; i++) {
      let free = files[i];
      if (free.id === "." && free.size >= file.size) {
        free.size -= file.size;
        files[j] = { id: ".", size: file.size };
        files.splice(i, 0, file);
        break;
      }
    }
  }
  return files;
}

function part2(input) {
  let diskMap = input.split("").map(Number);
  let files = diskMap.map((size, i) => ({ id: i % 2 ? "." : i / 2, size }));
  compactWhole(files);
  let blocks = files.flatMap(({ id, size }) => new Array(size).fill(id));
  let checksum = blocks.sum((x, i) => (x === "." ? 0 : i * x));

  console.log(checksum);
}

// part2(input);
timeIt(part2, input);
