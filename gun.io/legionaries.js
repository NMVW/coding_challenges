function countRomanXs(num) {
  let numWithXs = String(num % 100);

  if (numWithXs.length === 1) {
    numWithXs = `0${numWithXs[0]}`;
  }

  const tens = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 1,
    5: 0,
    6: 1,
    7: 2,
    8: 3,
    9: 1,
  };

  const ones = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 1,
  };

  const ten = tens[numWithXs[0]];
  const one = ones[numWithXs[1]];

  return ten + one;
}

function sumXs(num = 0) {

  let sum = 0;

  while (num > 0) {
    sum += countRomanXs(num);
    num--;
  }

  return sum;
}

console.log(sumXs(2660));
