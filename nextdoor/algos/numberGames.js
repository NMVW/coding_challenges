/**
 * 
 * Thoughts: Spent an extra hour working on this
 * was only able to get to this brute force approach to it, which only works for up to 8 digits
 */
const { performance } = require('perf_hooks');

const ENGLISH_DICTIONARY = new Set([
  'a',
  'app',
  'apple',
  'back',
  'barn',
  'cattle',
  'cloud',
  'clue',
  'def',
  'drink',
  'egg',
  'eggs',
  'farm',
  'fed',
  'find',
  'green',
  'ham',
  'i',
  'muffin',
]);

const DIGIT_TO_CHARS = {
  0: '',
  1: '',
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
};

// function phoneNumberToWords(phoneNumber) {
//   // if entire dictionary can be loaded in forgot how to implement a trie data structure here
//   let subNumbers = [];
//   for (let startIndex = 0; startIndex < phoneNumber.length; startIndex++) {
//     for (let endIndex = 0; endIndex < phoneNumber.length; endIndex++) {
//       const sequence = phoneNumber.slice(startIndex, endIndex);
//       if (sequence !== '') {
//         subNumbers.push(sequence);
//       }
//     }
//   }

//   console.log(subNumbers);

//   const subWords = subNumbers.reduce((subs, number) => {
//     console.log(subs, number);
//     const words = digitsToSubstrings(number); // ['ca', 'cat', 'a', ...]
//     return subs.concat(...words);
//   }, []);

//   return subWords;
// }

function phoneNumberToWords(phoneNumber) {
  return [...digitsToSubstrings(phoneNumber)].sort();
}

function digitsToSubstrings(digits, substring = '', stringList = new Set()) {

  // found valid word ?
  if (ENGLISH_DICTIONARY.has(substring)) {
    stringList.add(substring);
  }

  // O(digits) linear
  for (const d of digits) {

    const charPool = DIGIT_TO_CHARS[d];

    // O(charPool) linear
    for (const c of charPool) {

      if (c !== '') {

        // single character may be a word !
        if (ENGLISH_DICTIONARY.has(c)) {
          stringList.add(c);
        }

        // choose character to append to growing "word" candidate (keep substring intact for next c "path")
        // i.e. "ba" + "u", "ba" + "v", ...
        const chosenSubstring = substring + c;

        // after choosing a char, decrement remaining digit pool to select subsequent chars from (order matters permutation)
        const subDigits = digits.slice(1);

        /**
            O(digits!) => exponential time complexity! not good

            feasible for small digit length < 8
            O(24!) which is 1e24 (still high, but nodejs can pull it off)

            for 10 digits:
              top frame O(10 digits x 3 chars)
              sub frame O(30 - 3n)!

            approximate worst-case O(30!) which is 1e33, arguably why nodejs is crapping out

            investigate Trie data structure as optimization for time and space complexity (
              replace stack recursion with O(digits x words) linear in digit space length
              O(n) insertion
              O(n) retrieval
            )
         * 
         */
        // recursively generate growing substring word candidates and include in list
        stringList = digitsToSubstrings(subDigits, chosenSubstring, stringList);

      }
    }

  }

  return stringList;
}

const testCases = {
  // brute force not feasible beyond 8 digit numbers !
  '32143867': ['a', 'app', 'barn', 'def', 'egg', 'eggs', 'farm', 'fed', 'find', 'green', 'ham', 'i'],
  // '321438679': [], // execution time bananas :/
};

function runTests() {
  for (const test in testCases) {
    const start = performance.now();
    const output = phoneNumberToWords(test);
    const duration = ((performance.now() - start) / 1000).toFixed(2);
    console.log(`
      Case "${test}"\n
      Expected ${testCases[test]}
      Output   ${output}
      Time     ${duration} s
    `);
  }
}

runTests();
