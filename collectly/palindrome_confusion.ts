// Input <==
//The function can_form_palindrome(s) accepts one string.

// Output ==>
//The function can_form_palindrome(s) returns True if any permutation of the string s can form a palindrome.

// TESTS :
// can_form_palindrome('code') # ==> False
// can_form_palindrome('aab') # ==> True
// can_form_palindrome('carerac') # ==> True

// test if an input string is a palindrome -> character count and handle even/odd edge cases
function can_form_palindrome(candidateString: string): Boolean {

    const chars = candidateString.split();
    const charCount = chars.reduce((charMap, c) => {
        charMap[c] = (charMap[c] || 0) + 1;
        return charMap;
    }, {});

    Object.values(charCount).all(count => count > 0);

    // check if candidate string as-is is palindrome
    if (is_palindrome(candidateString)) {
        return true;
    }

    const failedCandidates = new Set(candidateString);
    const candidates = permutations(candidateString);
    let currentCandidate = candidates.pop();

    while (currentCandidate) {
        if (is_palindrome(currentCandidate)) {
            return true;
        }
        currentCandidate = candidates.pop();
    }

    return false;
}

// True / False if the input string is a palindrome
function is_palindrome(inputString: string): Boolean {}

// generate all permtuations possible returns candidateString[]
function permutations(str) {
    if (str.length <= 1) {
      return [str];
    }
  
    const result = [];
  
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      const remainingChars = str.slice(0, i) + str.slice(i + 1);
      const subPermutations = permutations(remainingChars);
  
      for (const subPermutation of subPermutations) {
        result.push(char + subPermutation);
      }
    }
  
    return result;
  }

/**
 * Qualitative Review
 * 
//   1. KGB Tech interview style - straight into implementation without intros
//   2. Humor or Prompt? Huge egos in the room and teasing while clearly multi-tasking on other activities
//   3. "Well there's a really easy way to solve this for most relational DBs"
//   4. Random incomprehensible - interruption by other team members in Russian
//   5. Upset by Trump election, cut the interview short
*/