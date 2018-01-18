const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

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
    // grab the index associated with this key via the hash function
    const index = getIndexBelowMax(key.toString(), this.limit);
    // fetch whatever is stored at this index
    const tempBucket = this.storage.get(index);

    if (tempBucket === undefined) {
      // if bucket is undefined, we need to add a bucket there
      this.storage.set(index, [[key, value]]);
      return;
    }

    // we have a bucket at this index already
    // we want to check to see if the we're trying to insert is already in this bucket
    for (let i = 0; i < tempBucket.length; i++) {
      // check to see if any keys in the bucket match the key we want to insert
      if (tempBucket[i][0] === key) {
        // this means we have a duplicate key we're trying to insert
        // we need to overwrite the old value with the new value
        tempBucket[i][1] = value;
        this.storage.set(index, tempBucket);
        return;
      }
    }

    // the key we're trying to insert is unique
    tempBucket.push([key, value]);
    this.storage.set(index, tempBucket);
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    if (!bucket) return;
    // if the bucket only contains the key value pair we're looking for, remove it as well
    if (bucket.length === 1) {
      this.storage.set(index, undefined);
      return;
    }

    for (let i = 0; i <= bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i].splice(i, 1);
        this.storage.set(index, bucket);
      }
    }
  }

  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    let found = [];

    if (!bucket) return;

    for (let i = 0; i <= bucket.length; i++) {
      if (bucket[i][0] === key) {
        found = bucket[i][1];
        return found;
      }
    }
  }
}

// var gg = new HashTable();
// gg.insert('B', 'hola soy B');
// gg.insert('Hi!', 'hola soy HI');
// gg.insert('2', 'hola soy 2');
// // gg.insert('7', 'hola soy 7');

// console.log(gg.retrieve('Hi!'));
module.exports = HashTable;
