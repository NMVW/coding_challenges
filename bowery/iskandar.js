function findNode(tree, nodeId) {

  // node exists on current level
  if (tree[nodeId]) {
    return tree[nodeId];
  }

  // traverse each existing children node in tree
  for (const id in tree) {
    // check next level for node
    const node = findNode(tree[id], nodeId);
    if (node) {
      return node;
    }
  }

  // should not happen for all valid people input see above INPUT ASSUMPTIONS
  return null;
}

// CONSTRAINTS:
// - single pass through the input people[] array
// - transform the array into something that will allow you to access each object or record instanteneously

// INPUT ASSUMPTIONS:
// - each person in people[] includes a non-null id property
// - for any person who has a non-null parentId, their parent person ref exists earlier in the people[] list (single visit constraint)
function rosterize(people) {
  return people.reduce((roster, person) => {

    // founder root node
    if (person.parentId === null) {
      roster[person.id] = {};
    } else {

      // find existing parent node in roster
      const level = findNode(roster, person.parentId);

      // add employee under parent node - "level" references parent member in roster
      level[person.id] = {};
    }

    return roster;
  }, {});
}

// NOTE: see input assumptions above for rosterize()
const people = [
  { id: "john", parentId: null },
  { id: "cesar", parentId: null },
  { id: "noah", parentId: null },
  { id: "eugene", parentId: "cesar" },
  { id: "richard", parentId: "cesar" },
  { id: "j3", parentId: "richard" },
  { id: "madeline", parentId: "eugene" },
  // { id: "sara", parentId: "eugene"},
  // { id: "george", parentId: "sara"},
];

// output
const expected = {
  john: {},
  noah: {},
  cesar: {
    richard: {
      j3: {}
    },
    eugene: {
      madeline: {}
    }
  }
};

const output = rosterize(people);
console.log(output, expected);
