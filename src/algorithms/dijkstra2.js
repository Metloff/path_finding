import {BinaryHeap} from '../structures/binaryHeap'

export function dijkstra(grid, startNode, finishNode) {
  // Init data.
  let queue = new BinaryHeap(function(x) { return x.distance; })
  const algGrid = initAlgGrid(grid);
  const visitedNodesInOrder = [];

  // Init start node.
  let algStartN = algGrid[startNode.row][startNode.col];
  algStartN.distance = 0;
  queue.push(algStartN);

  for(;;) {
    // If queue is empty.
    if (queue.size() == 0) {
      return {
        visitedNodesInOrder: visitedNodesInOrder, 
        nodesInShortestPathOrder: [],
      }
    }

    // Get element with smalest score. 
    let element = queue.pop();

    // If we encounter a wall, we skip it.
    if (element.type == "wall") continue;

    // If the element is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (element.distance === Infinity) {
      return {
        visitedNodesInOrder: visitedNodesInOrder, 
        nodesInShortestPathOrder: [],
      }
    }

    // If we find target
    if (equal(element, finishNode)) {
      return {
        visitedNodesInOrder: visitedNodesInOrder, 
        nodesInShortestPathOrder: getNodesInShortestPathOrder(element),
      } 
    }

    // Mark element as "visited"
    if (element.state != "visited") {
      element.state = "visited";
      visitedNodesInOrder.push(element);
    }
    
    processUnvisitedNeighbors(element, algGrid, queue);
  }
}

function processUnvisitedNeighbors(node, grid, queue) {
  const neighbors = getNeighbors(node, grid);

  for (const neighbor of neighbors) {
    const newDistance = node.distance + neighbor.weight;

    if (neighbor.distance > newDistance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
    }

    // Add node to the queue if we didn't it.
    if (neighbor.state == "unvisited") {
      neighbor.state = "in_queue";
      queue.push(neighbor);
    }
  }
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

function equal(e1, e2) {
  return e1.row == e2.row && e1.col == e2.col;
}

function createAlgNode(dataNode) {
  return {
    row: dataNode.row,
    col: dataNode.col,
    type: dataNode.type,
    previousNode: null,
    state: dataNode.state,
    distance: Infinity,
    weight: dataNode.weight,
  }
}

function initAlgGrid(grid) {
  const algGrid = [];

  for (const row of grid) {
    const curRow = [];
    for (const node of row) {
      curRow.push(createAlgNode(node));
    }

    algGrid.push(curRow);
  }

  return algGrid;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}