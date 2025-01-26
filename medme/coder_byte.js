/**
 * Given input describe what the output will be, comment on the function runtime
 * [
 *  { id: 2, value: "A" },
 *  { id: 5, value: "B" },
 *  { id: 9, value: "C" },
 *  { id: 8, value: "D" },
 *  { id: 6, value: "E" },
 *  { id: 4, value: "F" },
 *  { id: 4, value: "A" },
 *  { id: 2, value: "C" },
 * ]
* [
 *  { id: 2, count: 2 },
 *  { id: 4, count: 2 },
 *  { id: 6, count: 1 },
 *  { id: 8, count: 1  },
 * ]
 * 
 * O(n^2) -> remove nested loop by using a temp caching object to hold {id: count} refs as iterate O(n)
 * 
 */
// better function name? types, purpose, etc.
function manipulateData(data) {
  // iterate and accumulate an intermediate result over the data set list
  const result = data.reduce((acc, item) => {
    // for even item ids
    if (item.id % 2 === 0) {
      // find the target item in the accumulator if we've already treated one of the same id
      const existingItem = acc.find(c => c.id === item.id);
      if (existingItem) {
        // increment count
        existingItem.count += 1;
      } else {
        // initialize accumulator element
        acc.push({ id: item.id, count: 1 });
      }
    }
    return acc;
  }, []);
  // sort in asc/desc order by count
  return result.sort((a, b) => a.count - b.count);
}











//Have the function ApproachingFibonacci(arr) take the arr parameter being passed which will be an array of integers and determine the smallest positive integer (including zero) that can be added to the array to make the sum of all of the numbers in the array add up to the next closest Fibonacci number. For example: if arr is [15, 1, 3], then your program should output 2 because if you add up 15 + 1 + 3 + 2 you get 21 which is the closest Fibonacci number.
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144,
// 0, 1, 2, 3, 4, 5, ...
function ApproachingFibonacci(arr) { 
    // Fibonacci -> sum of last 2 = next value in sequence
  
    // sum of all current values
    const near_fib = arr.reduce((sum, v) => sum += v, 0);
  
    let n = 0;
    let nextFib = generateFib(n);
  
    // iterate fibs until we go OVER the sum (near_fib)
    while (nextFib < near_fib) {
      // generate next fib
      n++;
      nextFib = generateFib(n);
    }
  
    console.log(near_fib, nextFib)
    // sum of arr values + smallest_p = Fibonacci
    // return nearest Fibonacci number given current set of values in sequence
    return nextFib - near_fib;
  }
  
  // O(log n)
  function generateFib(n) {
    // base cases
    if (n === 0) {
      return 0;
    } else if (n === 1) {
      return 1;
    };
    // n = 2, generateFib(1) + generateFib(0)
    // n = 3, generateFib(2) + generateFib(1)
    return generateFib(n - 1) + generateFib(n - 2);
  }
     
     //console.log('testing fib gen', generateFib(7));
  // keep this function call here 
  console.log('Sample test passing: ' + (ApproachingFibonacci([5,2,1]) == 0));
  console.log('Sample test passing: ' + (ApproachingFibonacci([1,20,2,5]) == 6));