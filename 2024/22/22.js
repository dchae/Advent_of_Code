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

// Part 1
let input = readFileSync(path, "utf-8").trim();

function mix(a, b) {
  return a ^ b;
}

function prune(n, d = 16777216) {
  return ((n % d) + d) % d;
}

function step(n) {
  let res = n * 64;
  n = mix(n, res);
  n = prune(n);
  res = Math.floor(n / 32);
  n = mix(n, res);
  n = prune(n);
  res = n * 2048;
  n = mix(n, res);
  n = prune(n);
  return n;
}

function nthSecretNumber(x, n) {
  for (let i = 0; i < n; i++) {
    x = step(x);
  }
  return x;
}

function part1(input) {
  let secretNumbers = input.split("\n").map(Number);
  let res = secretNumbers;

  console.log(res.map((x) => nthSecretNumber(x, 2000)).sum());
}

timeIt(part1, input);

// Part 2
// find the sequence of four prices changes that will maximise price across all buyers
// create a hashmap of sequences : array
//  where array[i] = price at first occurrence of sequence for buyer i
//
// for each buyer
//  get array of 2001 secret numbers
//  get array of prices (ending digits)
//  get array of price changes
//  for each window of length 4:
//    if sequences[window][i] is undefined
//      sequences[window][i] = price

function getSecretNumberSequence(n, lim = 2000) {
  let res = [];
  while (res.length <= lim) {
    res.push(n);
    n = step(n);
  }

  return res;
}

function getPriceChanges(prices) {
  let res = [];
  for (let i = 1; i < prices.length; i++) {
    res.push(prices[i] - prices[i - 1]);
  }
  return res;
}

function getSequenceBestPrices(secretNumbers) {
  let sequenceBestPrices = new Map();

  for (let buyer = 0; buyer < secretNumbers.length; buyer++) {
    let initialSecretNumber = secretNumbers[buyer];
    let secretNumberSequence = getSecretNumberSequence(
      initialSecretNumber,
      2000,
    );
    let prices = secretNumberSequence.map((x) => x % 10);
    let priceChanges = getPriceChanges(prices);

    for (let i = 0; i + 3 < priceChanges.length; i++) {
      let price = prices[i + 1 + 3];
      let sequenceKey = priceChanges.slice(i, i + 4).join();
      // console.log(secretNumberSequence[i + 1 + 3], price, sequenceKey);
      if (!sequenceBestPrices.has(sequenceKey))
        sequenceBestPrices.set(sequenceKey, []);
      sequenceBestPrices.get(sequenceKey)[buyer] ??= price;
    }
  }

  return sequenceBestPrices;
}

function getBestSequence(sequenceBestPrices) {
  return Math.max(
    ...[...sequenceBestPrices.keys()].map((k) =>
      sequenceBestPrices.get(k).sum(),
    ),
  );
}

function part2(input) {
  let secretNumbers = input.split("\n").map(Number);
  let sequenceBestPrices = getSequenceBestPrices(secretNumbers);
  let bestSequence = getBestSequence(sequenceBestPrices);

  console.log(bestSequence);
}

timeIt(part2, input);
