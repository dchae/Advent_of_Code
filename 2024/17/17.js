/* eslint id-length: "off" */
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
Output:

computer
program: list of 3bit numbers (0..7)
registers: A, B, C
  - can hold any int
8 instruction
  - opcode + operand (both are 3bit numbers)

instruction pointer
- represents the position in the program from which the next opcode will be read
- starts at 0, increases by 2 (except for jump instructions)
- if instruction pointer >= program length, program halts

operands can be literal or combo
literal operand value is the operand itself
combo operand value is
  if 0..3, litera
  4 => A
  5 => B
  6 => C
  7 => reserved (means program is invalid)

*/

// Part 1
let input = readFileSync(path, "utf-8").trim();

function computer(A = 0n, B = 0n, C = 0n, program) {
  let output = [];
  const combo = (n) => (4n <= n ? [A, B, C][n - 4n] : n);

  const operations = [
    (operand) => (A /= 2n ** combo(operand)),
    (operand) => (B ^= operand),
    (operand) => (B = combo(operand) % 8n),
    (operand) => (i = A === 0n ? i : Number(operand - 2n)),
    (operand) => (B ^= C),
    (operand) => output.push(combo(operand) % 8n),
    (operand) => (B = A / 2n ** combo(operand)),
    (operand) => (C = A / 2n ** combo(operand)),
  ];

  let i = 0;
  while (i < program.length) {
    let [opcode, operand] = [program[i], BigInt(program[i + 1])];
    operations[opcode](operand);
    i += 2;
  }

  return output;
}

function part1(input) {
  let [register, program] = input
    .split("\n\n")
    .map((lines) => lines.match(/\d+/g).map(Number));
  let [A, B, C] = register.map(BigInt);
  let output = computer(A, B, C, program);
  console.log(output.join());
}

timeIt(part1, input);

// Part 2

function part2(input) {
  let [register, program] = input
    .split("\n\n")
    .map((lines) => lines.match(/\d+/g).map(Number));
  let [, B, C] = register.map(BigInt);

  let A = 0n;
  for (let i = 1; i <= program.length; i++) {
    let programSlice = program.slice(-i).join();
    for (let A2 = A << 3n; ; A2++) {
      if (computer(A2, B, C, program).slice(-i).join() === programSlice) {
        A = A2;
        break;
      }
    }
  }
  console.log(A);
}

timeIt(part2, input);
