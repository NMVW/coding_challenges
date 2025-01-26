// - Assume most recent language standard are available (ES6)
// - We expect good performance.
// - If missing more requirements details, just make reasonable assumptions of
//   your own.
// - Solution must be simple and compact.
//   No defensive coding, no comments, no unrequested features.
//   Only one file 10-20 lines of code
// - Work only inside Google Docs: no external editor/IDE/debugger, no copy-paste
//   to/from such an editor. We must see the flow of how you write the code.

// Note: you have total of 30 minutes for both question!

'use strict';
// (1)
// Implement function verify(text) which verifies whether parentheses within text are
// correctly nested. You need to consider three kinds: (), [], <>.
//  Examples: 
let inputs = ["---(++++)----", "", "before ( middle []) after ", 
") (", "} {", "<(   >)", "(  [  <>  ()  ]  <>  )", "   (      [)"];
let alpha = ['a','b','c','d','e','f','g','h'];

inputs.forEach(function(input, z) {
  console.log(alpha[z], verify(input), input);
}); 
//A -> 1
//B-> 1
//C-> 1
//D-> 0
//E-> 1 //no, this is not a mistake.
//F -> 0
//G -> 1
//H-> 0

function Xverify(text) {
  let close = [];
  let pairs = {'(': ')', '[': ']', '<': '>'};
  for (let i = 0; i < text.length; i++) {
    let open = text[i]; 
    if (pairs[open]) {
      close.push(pairs[open]);
    }
  }
  for (let j = 0; j < text.length; j++) {
    if (close[close.length-1] === text[j]) {
      close.pop();
    }
  }
  return close.length === 0 ? true: false;  
} 

// (2)

// Problem
// Simplify the implementation below as much as you can.
// Even better if you can also improve performance as part of the simplification!
// FYI: This code is over 35 lines and over 300 tokens, but it can be written in
// 5 lines and in less than 60 tokens.
// Function on the next page.

// INPUT: string, string, string -> OUTPUT: integer -1 or maxIndex of a or b found in s

function maxIndex(s, a, b) {
  s = s.split('');
  return Math.max(s.indexOf(a), s.indexOf(b)); 
}

// INPUT: string, string, string -> OUTPUT: integer -1 or maxIndex of a or b found in s
// 
function func(s, a, b)
{
    var match_empty=/^$/ ;
    if (s.match(match_empty))
    {
        return -1;
    }
    else
    {
        var i=s.length-1; // lastIndex in s
        var aIndex=-1;
        var bIndex=-1;

        while ((aIndex==-1) && (bIndex==-1) && (i>=0))
        {
            if (s.substring(i, i+1) == a)
                aIndex=i;
          if (s.substring(i, i+1) == b)
                bIndex=i;
          i--;
        }

        if (aIndex != -1)
        {
            if (bIndex == -1)
                return aIndex;
          else
                return Max(aIndex, bIndex);
        }
        else
        {
            if (bIndex != -1)
                return bIndex;       
        else
                return -1;
        }
    }
};

var s = 'string';
var a = 'r';
var b = 'g';

console.log(maxIndex(s,a,b) === func(s,a,b));

// I got the following after i debugged my above soln using your test cases:

function verify(text) {
  let close = [];
  let pairs = {'(': ')', '[': ']', '<': '>'};
  
  for (let i = 0; i < text.length; i++) {
    let open = text[i]; 
    if (pairs[open]) {
      close.push(pairs[open]);
    } else if (open === close[close.length-1]) {
      close.pop();
    }
  }
  return close.length === 0 ? 1: 0;  
} 

