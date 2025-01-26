function oddFib(max = 0) {

  let sum = 0;
  let n = 0;
  let value = fib(n);

  while (value < max) {

    // test oddity
    if (value % 2 > 0) {
      sum += value;
    }

    value = fib(n);

    n++;
  }

  return sum;
}

function fib(n) {
  if ([0, 1].includes(n)) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

console.log(oddFib(10000));