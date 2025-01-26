
 // Definition for singly-linked list. Sorted by ascending val 0+.
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// h -> 1 -> next -> 2* -> next -> 2 -> next -> 2 -> *3 original list
// h -> 1 -> next -> 2* -> next -> *2 -> 3 original list
// h -> 1 -> next -> 2* -> next -> *2 -> 3 original list

// h -> 1 -> 2 -> 3 modified list

const head = new ListNode(1, new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, null)))))
  
function deleteDuplicates (head) {
 
  // head {val: number, next: ListNode}

  let currentNode = head;

  // traverse the linked list
  while (currentNode !== null) {

    // currentNode.val 2*
    // currentNode.next.val 2
    let nextNode = currentNode.next;

    // tail reached
    if (nextNode === null) {
      break;
    }

    const hasDupe = currentNode.val === nextNode.val;

    // if dupe, we want to update nextNode, while keeping currentNode static
    if (hasDupe) {
      // moving next node to current node's next pointer
      // hop current node's next ref to nextNode's next ref (losing intermediate node)
      currentNode.next = nextNode.next;
    } else {
      // continue moving current node
      currentNode = currentNode.next; // updated assignment
    }
  
    // continue moving next node
    nextNode = nextNode.next;
  }

  return head;
}
  
console.log(deleteDuplicates(head));

// Dan frontend few months, has better skillset in frontend firebase / react native
// Trevor fs  engineer (data providers)
