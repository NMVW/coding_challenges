// factorials ex:
// 3 => 3 * 2 * 1 = 6
// 5 => 5 * 4 * 3 * 2 * 1

// O(n) n memory
// O(n) n for time loser for runtime since an object is allocated for each stack frame initialized
function factorialRecursive(n) {

  // base cases
  if (n < 0) {
    return undefined;
  }

  if ((n === 0) || (n === 1)) {
    return 1;
  }

  // looping
  return n * factorialRecursive(n - 1);
}

// O(n) c for memory
// O(n) n for time still winner for runtime since a single object is allocated
function factorialIterate(n) {

  // base cases
  if (n < 0) {
    return undefined;
  }
  
  if ((n === 0) || (n === 1)) {
    return 1;
  }

  let result = n;

  while (n > 1) {
    result = result * (n - 1); // float * float
    n--;
  }

  return result;
}

const tests_cases = [1, 2, 3, 4, 5, 6];

tests_cases.forEach(n => console.log(factorialRecursive(n)));
tests_cases.forEach(n => console.log(factorialIterate(n)));
