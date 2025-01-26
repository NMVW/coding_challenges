function flatten(arr) {
  
  arr = arr || [];

  return arr.reduce(function(flat, curr) {
    if (typeof curr !== 'number' && !Array.isArray(curr)) {
      throw Error("Invalid input type");
    } else if (typeof curr !== 'number') {
      return flat.concat(flatten(curr));
    } else {
      return flat.concat(curr);
    }
  }, []);

}


console.log(flatten());
console.log(flatten([1,[[5]], [[[3,7,[8]]],[1,3,2]],9]));

console.log(flatten([[[1],'a']]));
