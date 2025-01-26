function sumSentence(str = '') {

  const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
  const charsToSum = str.split('').filter(c => /^[A-Za-z]+$/.test(c));

  return charsToSum.reduce((sum, c) => {
    if (vowels.has(c)) {
      sum -= c.codePointAt(0);
    } else {
      sum += c.codePointAt(0)
    }
    return sum;
  }, 0);
}

console.log(sumSentence("Dealing with failure is easy: Work hard to improve. Success is also easy to handle: You’ve solved the wrong problem. Work hard to improve."));
