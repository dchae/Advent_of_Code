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

function count(iter, condition) {
  return iter.reduce((count, x) => count + (condition(x) ? 1 : 0), 0);
}

let path = filepath("input.txt");
// path = filepath("exinput.txt");

// Part 1
let line = readFileSync(path, "utf-8").trim();

function getMultSum(line) {
  let matches = [...line.matchAll(/mul\((\d+),(\d+)\)/g)];
  let pairs = matches.map((match) => [match[1], match[2]].map(Number));
  let mults = pairs.reduce((sum, [a, b]) => sum + a * b, 0);
  return mults;
}
console.log(getMultSum(line));

// Part 2

function cleanLine(line) {
  return line.replace(/((?<=don't\(\))[\s\S]*?(?=do\(\)|$))/g, (s) =>
    s.toUpperCase(),
  );
}

console.log(getMultSum(cleanLine(line)));
