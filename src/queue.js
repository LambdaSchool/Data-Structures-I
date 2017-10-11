/*
  1. Add a constructor with a storage structure; there are multiple options you could use for this
  2. Add a size getter that returns the number of items the queue is storing
  3. Add an `enqueue` method that accepts an item as input and adds it to the storage structure
  4. Add a `dequeue` method that removes the item in the queue that was added earliest
*/
const LinkedList = require('./linked-list.js');

class Queue {
  constructor() {
    this.storage = new LinkedList();
  }
  get size() {
    return this.storage.length;
  }
  enqueue(item) {
    this.storage.addToTail(item);
  }
  dequeue() {
    const item = this.storage.removeHead();
    return item;
  }
}

// class Queue {
//   constructor() {
//     this.storage = [];
//   }
//   get size() {
//     return this.storage.length;
//   }
//   enqueue(item) {
//     this.storage = [...this.storage, item];
//   }
//   dequeue() {
//     const item = this.storage[0];
//     this.storage = this.storage.slice(1);
//     return item;
//   }
// }

module.exports = Queue;
