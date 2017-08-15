const LinkedList = require('./linked-list');
const HashTable = require('./hash-table');

class LimitedArray {
  constructor(limit) {
    this.storage = [];
    this.limit = limit;
  }
  resize(newLimit) {
    const oldstorage = this.storage;
    this.limit = 16;
    this.storage = [];
  }
  checkLimit(index) {
    if (typeof index !== 'number') throw new Error('The supplied index needs to be a number');
    if (this.limit <= index) {
      throw new Error('The supplied index lies out of the array\'s bounds');
    }
  }
  each(cb) {
    for (let i = 0; i < this.storage.length; i++) {
      cb(this.storage[i], i);
    }
  }
  get(index) {
    this.checkLimit(index);
    return this.storage[index];
  }
  get length() {
    return this.storage.length;
  }
  set(index, value) {
    this.checkLimit(index);
    this.storage[index] = value;
  }
}

/* eslint-disable no-bitwise, operator-assignment */
const getIndexBelowMax = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

module.exports = {
  LimitedArray,
  getIndexBelowMax,
};
