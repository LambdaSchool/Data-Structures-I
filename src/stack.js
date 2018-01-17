/*
  1. Add a constructor with a storage structure; there are multiple options you could use for this
  2. Add a size getter that returns the number of items the stack is storing
  3. Add a `push` method that accepts an item as input and adds it to the storage structure
  4. Add a `pop` method that removes the most recently-added item to the stack
*/
class Stack {
  constructor(storage) {
    this.storage = [];
    this.size = 0;
  }

  push(x) {
    this.storage.push(x);
    this.size++;
  }

  pop(x) {
    if (this.storage.length === 0) return null;
    this.size--;
    return this.storage.pop(x);
  }

  size() {
    return this.size;
  }

}

/*
class Stack {
  constructor() {
    this.storage = [];
    this.count = 0;
  }
  get size() {
    return this.count;
  }
  push(input) {
    const l = this.size;
    this.storage[l] = input;
    this.count++;
    return this.count;
  }
  pop() {
    const l = this.size;
    if (l === 0) return null;
    const popped = this.storage[l - 1];
    this.storage[l - 1] = null;
    this.count--;
    return popped;
  }
}
*/
module.exports = Stack;
