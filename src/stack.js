class Stack {
  constructor() {
    this.items = {};
    this.size = 0;
    this.push = this.push;
    this.pop = this.pop;
  }

  push(item) {
    if (this.size === 0) {
      this.items[this.size] = item;
      this.size++;
    } else {
      const allItems = Object.keys(this.items).map(el => this.items[el]);
      allItems.unshift(item);
      this.size++;

      for (let i = 0; i < allItems.length; i++) {
        this.items[i] = allItems[i];
      }
    }
  }

  pop() {
    if (this.size === 0) {
      return 0;
    }

    let topObject;

    const allItems = Object.keys(this.items).map((el, i) => {
      if (i !== 0) {
        return this.items[el];
      }
      return topObject = this.items[el];
    });

    allItems.shift();

    for (let z = 0; z < allItems.length; z++) {
      this.items[z] = allItems[z];
    }

    delete this.items[this.size - 1];
    this.size--;

    return topObject;
  }

  size() {
    return this.size;
  }
}


module.exports = Stack;
