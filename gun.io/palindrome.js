function sumNumPalindromes(max = 0) {
  let sum = 0;
  let start = 0;

  while (start < max) {
    sum += addPalindrome(String(start).split(''));
    start++;
  }

  return sum;
}

const addPalindrome = (arr = []) => {
  let list = [...arr];

  while (list.length > 1) {
    if (list[0] === list[list.length - 1]) {
      list.pop();
      list.shift();
    } else {
      return 0;
    }
  }

  return Number(arr.join(''));
}

console.log(sumNumPalindromes(10000));