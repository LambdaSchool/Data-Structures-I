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
    const newNode = {
      value,
      previous: null,
      next: null,
    };

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }
  }
  // Removes the current head node from the list, replacing it with the next element in the list
  // Returns the value of the removed node
  removeHead() {
    if (this.head === null) return null;
    const tempValue = this.head.value;
    this.head = this.head.next;
    return tempValue;
  }

  // Checks the linked list for the given value
  // Returns true if the the value is found in the list, false otherwise
  contains(value) {
    let current = this.head;

    while (current !== null) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  // These values are for Queue and Stack extra credit.
  get size() {
    let current = this.head;
    let count = 0;

    while (current !== null) {
      count++;
      current = current.next;
    }

    return count;
  }

  addToHead(value) {
    const newNode = {
      value,
      previous: null,
      next: this.head,
    };
    this.head = newNode;
  }
}

module.exports = LinkedList;
