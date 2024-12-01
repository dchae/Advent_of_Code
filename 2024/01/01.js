"use strict";
const { readFileSync } = require("fs");
const { join, resolve } = require("path");

function filepath(filename, subfolder = "") {
  return join(resolve(__dirname), subfolder, filename);
}

let path = filepath("input.txt");
// path = filepath("exinput.txt");
let lines = readFileSync(path, "utf-8").trim().split("\n");

let list1 = [];
let list2 = [];

for (let line of lines) {
  let [a, b] = line.split(/\s+/);
  list1.push(Number(a));
  list2.push(Number(b));
}

list1.sort();
list2.sort();

let differences = list1.map((x, i) => Math.abs(x - list2[i]));
let sum = differences.reduce((acc, x) => acc + x);
console.log(sum);

function toTally(iter) {
  return iter.reduce(
    (tally, x) => tally.set(x, (tally.get(x) ?? 0) + 1),
    new Map(),
  );
}

let tally2 = toTally(list2);
console.log(tally2);
let simScore = list1.reduce((acc, x) => acc + x * (tally2.get(x) ?? 0), 0);
console.log(simScore);
