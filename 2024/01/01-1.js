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

let path = filepath("input.txt");
// path = filepath("exinput.txt");
let lines = readFileSync(path, "utf-8").trim().split("\n");

// Part 1

let lists = transpose(lines.map((line) => line.match(/\d+/g).map(Number)));
lists.forEach((list) => list.sort());

let pairs = lists[0].map((x, i) => [x, lists[1][i]]);

let res = pairs.map(([a, b]) => Math.abs(a - b)).sum();

console.log(res);

let tally = toTally(lists[1]);
// console.log(tally);
let res2 = lists[0].map((x) => x * (tally.get(x) ?? 0)).sum();
console.log(res2);
