// return boolean from input strings
function isDivisible(subStr, superStr, andLcd = false) {
    // // s abcc|abcc|abcc
    // // t abcc|abcc
    // // u abcc
    // // n * u.concat(u) = t
    // // m * u.concat(u) = s
    let subsetIndex = 0;
    // does t fit into s evenly?

    // iterate through input s, and compare to same index char in t, count up to subsetCount
    // to reset t index
    for (const superIndex in superStr) {
      
        // guard against accessing beyond subset, need to reset index
        if (subsetIndex === subStr.length) {
          subsetIndex = 0;
        }

        // check to continue proving subset property of t dividing evenyl into s
        if (superStr[superIndex] !== subStr[subsetIndex]) {
            return false;
        }

        subsetIndex++;
    }

    // is lcd? substr must ALSO mod out to 0
    return andLcd ? !Boolean(superStr.length % subStr.length): true;
}

/*
 * Complete the 'findSmallestDivisor' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. STRING t
 */

// example 1
// s 'bcdbcdbcdbcd'
// t 'bcdbcd'
function findSmallestDivisor(s, t) {

    // s, t are strings
    // 1. find divisibility of s by t - "fully divisible into s by t"
    // u 'bcd' least common denominator
    if (!isDivisible(t, s)) {
        // find u and return length of that
        return -1;
    };

    // now find u, assuming s is fully divisible by t so find lcd
    let lcd = '';
    for (const char of t) {
        // have built and found lcd
        if (lcd !== '' && isDivisible(lcd, t)) {
            return lcd.length;
        }
        lcd += char;
    }

    return lcd.length;
}

console.log(findSmallestDivisor('abcabc', 'abc'));
