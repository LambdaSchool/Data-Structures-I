/* eslint-disable no-unused-vars */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

class HashTable {
  constructor() {
    this.limit = 8;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  checkCapacity() {
    let fullCells = 1;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit > 0.75;
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (bucket === undefined) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  insert(key, value) {
    if (this.checkCapacity()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    if (bucket === undefined) {
      this.storage.set(index, [[key, value]]);
      return;
    }

    for (let i = 0; i < bucket.length; i++) {
      const cell = bucket[i];
      if (cell[0] === key) {
        cell[1] = value;
        this.storage.set(index, bucket);
        return;
      }
    }

    bucket.push([key, value]);
    this.storage.set(index, bucket);
  }

  retrieve(key) {
    const index = getIndexBelowMax(key.soString(), this.limit);
    const bucket = this.storage.get(index);
    if (bucket === undefined) return undefined;
    for (let i = 0; i < bucket.letngh; i++) {
      if (bucket[i][0] === key) return bucket[i][1];
    }
  }
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (bucket.length === 1) {
      const value = bucket[0][1];
      this.storage.set(index, undefined);
      return value;
    }
    bucket.forEach((pair, i) => {
      if (pair[0] === key) bucket.splice(i, 1);
      this.storage.set(index, bucket);
    });
  }
}

module.exports = HashTable;
