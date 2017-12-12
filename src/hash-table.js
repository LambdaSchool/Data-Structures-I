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
  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    // hash our key and get back an index into our Limited Array
    const index = getIndexBelowMax(key.toString(), this.limit);
    // use the index to fetch whatever is at that slot in our Limited Array
    const bucket = this.storage.get(index);
    // inspect what we got
    if (bucket === undefined) {
      // if there is nothing in the slot, insert our key value pair inside a newly-instantiated bucket
      this.storage.set(index, [[key, value]]);
      return;
    }
    // otherwise, we'll need to add our new key-value pair to the bucket
    // make sure to maintain the uniqueness of keys property
    for (let i = 0; i < bucket.length; i++) {
      // inspect each key
      // in the case that our input key is already inside the hash table
      if (bucket[i][0] === key) {
        // overwrite the old key-value pair's value
        bucket[i][1] = value;
        // set this bucket back into the hash table
        this.storage.set(index, bucket);
        return;
      }
    }
    // turns out that the key we're trying to insert is unique
    // we can just add it to our bucket
    bucket.push([key, value]);
    this.storage.set(index, bucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (bucket === undefined) return;
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i].splice([i], 1);
      }
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    if (bucket === undefined) return;
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
  }
}

module.exports = HashTable;
