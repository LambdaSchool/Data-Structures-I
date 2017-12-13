/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

// LimitedArray, and getIndexBelowMax are two tools provided for you in the helper file.
// There are other methods on the LimitedArray class in the './hash-table-helpers' file that you can use for your implementation.

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }
  checkCapacity() {
    // istantiate a variable to keep track of the number of all slots in our listed array
    // increment our variable for every full slot
    // if the number of buckets is >= 0.75 of total limit, return true
    let fullSlots = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) ++fullSlots;
    });
    return (fullSlots / this.limit) >= 0.75;
  }

  resize() {
    // increase the limit of our limited array by a factor of 2
    this.limit *= 2;
    // keep a reference to the old limited array
    const oldStorage = this.storage;
    // create a new limited array with double the original capacity
    this.storage = new LimitedArray(this.limit);
    // put all of the buckets from our limited array into our new expanded limited array
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }
  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    // call resize before every insertion
    if (this.checkCapacity()) this.resize();
    // if (this.limit > this.limit * 0.75) this.resize();
    // has our key and get an index into our limited array
    const index = getIndexBelowMax(key.toString(), this.limit);
    // use the index to fetch whatever is at the slot in our limited array
    const bucket = this.storage.get(index);
    // inspect what we got
    // if there is nothing in tthe slot, insert our key value pair inside a newly- instantiated bucket
    if (bucket === undefined) {
      this.storage.set(index, [[key, value]]);
      return;
    }
    // otherwise, we'll need to add our new key value pair to the bucket
      // make sure to maintain the uniqueness of key property
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        this.storage.set(index, bucket);
        return;
      }
    }
    bucket.push([key, value]);
    this.storage.set(index, bucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    // if nothing in bucket return undefined
    if (bucket === undefined) return undefined;
    // if something is in bucket delete the [key, value]
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i].splice(i, 1);
        this.storage.set(index, bucket);
        return;
      }
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    // if nothing is in bucket return undefined
    if (bucket === undefined) return undefined;
    // get index -> iterate through array to find key, from key get value(only wants the value);
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
  }
}

module.exports = HashTable;
