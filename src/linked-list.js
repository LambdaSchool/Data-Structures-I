/* eslint-disable class-methods-use-this */
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    // Do not modify anything inside of the constructor
  }
  // Wraps the given value in a node object and adds the node to the tail of the list
  // If the list is empty, the new element is considered the tail as well as the head
  // If there is one element in the list before the new element is added, the new element becomes the tail of the list
  addToTail(value) {
    const node = {
      value,
      next: null,
    };
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }
  // Removes the current head node from the list, replacing it with the next element in the list
  // Returns the value of the removed node
  removeHead() {
    const removeValue = this.head.value;
    this.head = this.head.next;
    return removeValue;
  }
  // Checks the linked list for the given value
  // Returns true if the the value is found in the list, false otherwise
  contains(value) {
    if (!this.head.next) return this.head.value === value;
    let myHead = this.head;
    while (myHead.next) {
      if (myHead.value === value) {
        return true;
      }
      myHead = myHead.next;
    }
    return myHead.value === value;
  }
}

module.exports = LinkedList;
