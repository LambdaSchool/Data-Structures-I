const LinkedList = require('../src/linked-list');

class Stack {
  constructor() {
    // this.stack = [];
    this.stack = new LinkedList();
  }
  add(object) {
    // return this.stack.push(object);
    return this.stack.addToTail(object);
  }
  remove() {
    // return this.stack.pop();
    return this.stack.removeTail();
  }
  get size() {
    // return this.stack.length;
    return this.stack.size;
  }
}

module.exports = Stack;
