export class BinaryHeap {
  constructor(scoreFunction) {
    this.list = [];
    this.scoreFunction = scoreFunction;
  }

  push(element) {
    // Add the new element to the end of the array. 
    this.list.push(element)

    // Allow it to bubble up.
    this.bubbleUp(this.list.length - 1);
  }

  remove(node) {
    let length = this.list.length;

    // To remove a value, we must search through the array to find it.
    for (let i = 0; i < length; i++) {
      if (this.list[i] != node) continue;

      // When it is found, the process seen in 'pop' is repeated
      // to fill up the hole.
      let end = this.list.pop();

      // If the element we popped was the one we needed to remove,
      // we're done.
      if (i == length - 1) break;

      // Otherwise, we replace the removed element with the popped
      // one, and allow it to float up or sink down as appropriate.
      this.list[i] = end;
      this.bubbleUp(i);
      this.sinkDown(i);
      break;
    }
  }

  pop() {
    // Store the first element so we can return it later.
    let result = this.list[0];

    // Get the element at the end of the array.
    let end = this.list.pop();

    // If there are any elements left, put the end element at the
    // start, and let it sink down.
    if (this.list.length > 0) {
      this.list[0] = end;
      this.sinkDown(0);
    }

    return result;
  }

  size() {
    return this.list.length;
  }

  sinkDown(i) {
    if (this.list.length <= 0) return ;

    // Look up the target element and its score.
    let length    = this.list.length; 
    let element   = this.list[i];
    let elemScore = this.scoreFunction(element);

    for(;;) {
      // Compute the indices of the child elements.
      let child2N = (i + 1) * 2; 
      let child1N = child2N - 1;

      // This is used to store the new position of the element,
      // if any.
      let swap = null;

      let child1 = {}, child1Score = 0;
      let child2 = {}, child2Score = 0;

      // If the first child exists (is inside the array)...
      if (child1N < length) {
        child1 = this.list[child1N], child1Score = this.scoreFunction(child1);
        // If the score is less than our element's, we need to swap.
        if (child1Score < elemScore) {
          swap = child1N;
        }
      }

      // Do the same checks for the other child.
      if (child2N < length ) {
        child2 = this.list[child2N], child2Score = this.scoreFunction(child2);

        if (child2Score < (swap == null ? elemScore : child1Score)) {
          swap = child2N;
        }
      }

      // No need to swap further, we are done.
      if (swap == null) break;

      // Otherwise, swap and continue.
      this.list[i]    = this.list[swap];
      this.list[swap] = element;

      i = swap;
    }
  }

  bubbleUp(i) {
    // Fetch the element that has to be moved.
    let element = this.list[i], score = this.scoreFunction(element);

    // When at 0, an element can not go up any further.
    while(i > 0) {
      // Fetch parent node.
      let parentIdx = Math.floor((i + 1) / 2) - 1;
      let parentElem = this.list[parentIdx], parentScore = this.scoreFunction(parentElem);

      // If the parent has a lesser score, things are in order and we
      // are done.
      if (score >= parentScore) {
        break;
      }

      // Otherwise, swap the parent with the current element and
      // continue.
      this.list[parentIdx]  = element;
      this.list[i]          = parentElem;
      i = parentIdx;
    }
  }
}