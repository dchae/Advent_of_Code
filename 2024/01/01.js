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
path = filepath("exinput.txt");
let lines = readFileSync(path, "utf-8").trim().split("\n");

// Part 1

let pairs = lines.map((line) => line.split(/\s+/).map(Number));
let [list1, list2] = transpose(pairs);
[list1, list2].forEach((arr) => arr.sort((a, b) => a - b));

let differences = list1.map((x, i) => Math.abs(x - list2[i]));
console.log(differences.sum());

// Part 2

let tally2 = toTally(list2);
let simScore = list1.sum((x) => x * (tally2.get(x) ?? 0));
console.log(simScore);
