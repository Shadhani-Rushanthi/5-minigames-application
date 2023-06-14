class PriorityQueue {
    constructor(comparator) {
      this.comparator = comparator || ((a, b) => a - b);
      this.elements = [];
    }
  
    enqueue(element) {
      this.elements.push(element);
      this.heapifyUp();
    }
  
    dequeue() {
      if (this.isEmpty()) {
        return null;
      }
      const root = this.elements[0];
      const lastElement = this.elements.pop();
      if (!this.isEmpty()) {
        this.elements[0] = lastElement;
        this.heapifyDown();
      }
      return root;
    }
  
    peek() {
      return this.isEmpty() ? null : this.elements[0];
    }
  
    isEmpty() {
      return this.elements.length === 0;
    }
  
    heapifyUp() {
      let currentIndex = this.elements.length - 1;
      while (currentIndex > 0) {
        const parentIndex = Math.floor((currentIndex - 1) / 2);
        if (this.comparator(this.elements[currentIndex], this.elements[parentIndex]) >= 0) {
          break;
        }
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      }
    }
  
    heapifyDown() {
      let currentIndex = 0;
      const length = this.elements.length;
      while (true) {
        const leftChildIndex = 2 * currentIndex + 1;
        const rightChildIndex = 2 * currentIndex + 2;
        let nextIndex = currentIndex;
        if (
          leftChildIndex < length &&
          this.comparator(this.elements[leftChildIndex], this.elements[nextIndex]) < 0
        ) {
          nextIndex = leftChildIndex;
        }
        if (
          rightChildIndex < length &&
          this.comparator(this.elements[rightChildIndex], this.elements[nextIndex]) < 0
        ) {
          nextIndex = rightChildIndex;
        }
        if (nextIndex === currentIndex) {
          break;
        }
        this.swap(currentIndex, nextIndex);
        currentIndex = nextIndex;
      }
    }
  
    swap(index1, index2) {
      const temp = this.elements[index1];
      this.elements[index1] = this.elements[index2];
      this.elements[index2] = temp;
    }
  }
  