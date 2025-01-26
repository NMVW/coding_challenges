// Fresh firepad for you!

// runlength_encode("aabbbcaa") should return "2a3b1c2a"
// JS <RUN>

function runlength_encode(inputStr='') {

  // 1. inputStr = "aabbbcaa";

  let compressed = '';

  let prevChar = '';
  let charCount = 0; // in the loop current character exists

  // O(n) runtime
  // O(c) memory
  for (const index in inputStr) {

    const currChar = inputStr[index];
    const isSameChar = prevChar === currChar;
    const isFinalChar = Number(index) === (inputStr.length - 1);

    // 2.1 "a" === "a"
    // 2.2 "a" === "a"
    // 2.3 "a" === "b"
    //    ...
    // 2.6 "b" === "c", compressed. = "2a3b", prevChar = "b", charCount =
    // final case prevChar = "a", currChar = "a", charCount = 1, compressed = "2a3b1c"

  	// parse the input, aa => 2a, bbb => 3b, c => 1c, aa => 2a
    const isInitialChar = prevChar === '';

    if (isSameChar || isInitialChar) {
      // prevChar is the initial case (edge case)

      // 2.1 charCount = 1
      // 2.2 charCount = 2
      charCount++; // add to count

    } else {

      // 2.3 charCount = 2, prevChar = "a"

      // end of streak of prevChar => add necessary count + prevChar
      compressed += `${charCount}${prevChar}`;

      // 2.3 compressed = "2a"

      charCount = 1; // currChar is different from prevChar "new streak"

    }

    // final character check (need to updated compressed before exiting loop)
    console.log('index', index, currChar, prevChar, charCount, inputStr.length)
    if (isFinalChar) {
      if (isSameChar) {
        console.log('match', prevChar);
        compressed += `${charCount}${prevChar}`; // compressed = "2a3b1c2a"
      } else {
        console.log('no match', prevChar);
        compressed += `${charCount}${prevChar}1${currChar}`;
      }
    }

    // final prevChar = "a", currChar = "a", charCount = 2, compressed = "2a3b1c"
    // assign next value to reference to track streak
    prevChar = currChar;

  }

  //  compressed = "2a3b1c2a"
  return compressed;

}
