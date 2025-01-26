const util = require('util');

class Comment {
  constructor(commentId, parentId) {
    this.commentId = commentId;
    this.parentId = parentId;
  }
}

class CommentTreeNode {
   // instance of Comment above
  constructor(comment, parent) {
    // Comment
    this.comment = comment;
    // CommentTreeNode | null
    this.parent = parent;
    // Array of CommentTreeNodes
    this.children = [];
  }
}

function flatToTree(comments) {
  // Convert the comments from a flat list to a tree-like structure. The comments should be
  // returned in the same order provided to the function.
  // :param comments: Array of Comment objects
  // :return: Array of CommentTreeNodes, which represent the Comments in a tree

  const trees = []; // root - to - children
  const nodeMap = {};

  comments.forEach((comment, currIndex) => {

      // parent will always be listed prior to child
      const isRootNode = comment.parentId === null;

      if (isRootNode) {
          const newTree = new CommentTreeNode(comment, null);
          // keep track in nodemap for O(c) lookup
          nodeMap[newTree.comment.commentId] = newTree;
          trees.push(newTree);
          return;
      }

      // here child node because parentId is not null
      const parentTree = nodeMap[comment.parentId];

      if (!parentTree) {
          console.error(`Orphan Found ${comment.commentId}`);
          return;
      }

      const newNode = new CommentTreeNode(comment, parentTree.comment);

      // constant time look up in the hash map
      nodeMap[comment.commentId] = newNode;

      parentTree.children.push(newNode)

  });

  return trees;
}

// Example
// No limitation to nesting depth, child can become parent
// 0
//   1
//   2
//   4
//      5
//      6
// 3
const comments = [
    new Comment(0, null),
    new Comment(1, 0),
    new Comment(2, 0),
    new Comment(3, null),
    new Comment(4, 0),
    new Comment(5, 4),
    new Comment(6, 4)
];

// console.log(flatToTree(comments)); // Should return an array containing two CommentTreeNodes
console.log(util.inspect(flatToTree(comments), false, 10, true));
