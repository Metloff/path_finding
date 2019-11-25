export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [];
  const algGrid = initAlgGrid(grid);

  algGrid[startNode.row][startNode.col].distance = 0;
  inQueueTransaction(algGrid, queue, startNode.row, startNode.col)

  for (;;) {
     if (queue.length == 0) { 
      return {
        visitedNodesInOrder: visitedNodesInOrder, 
        nodesInShortestPathOrder: getNodesInShortestPathOrder(algGrid[finishNode.row][finishNode.col]),
      }
    }

    const closestNodeCoord = queue.shift();
    // If queue is empty we must stop.
    if (closestNodeCoord == undefined) {
      return {
        visitedNodesInOrder: visitedNodesInOrder, 
        nodesInShortestPathOrder: [],
      }
    } 

    const closestNode = algGrid[closestNodeCoord.row][closestNodeCoord.col];
    // If we encounter a wall, we skip it.
    if (closestNode.type == "wall") continue;
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) {
      return {
        visitedNodesInOrder: visitedNodesInOrder, 
        nodesInShortestPathOrder: [],
      }
    }
    
    if (closestNode.state != "visited") {
      closestNode.state = "visited";
      visitedNodesInOrder.push(closestNode);
    }
    
    processUnvisitedNeighbors(closestNode, algGrid, queue);
  }
}

function processUnvisitedNeighbors(node, grid, queue) {
  const unvisitedNeighbors = getNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    const newDistance = node.distance + neighbor.weight;
    let isChangedDistance = false;
    if (neighbor.distance > newDistance) {
      neighbor.distance = newDistance;
      neighbor.previousNode = node;
      isChangedDistance = true;
    }

    // Add node to the queue if we didn't it.
    if (neighbor.state == "unvisited" || isChangedDistance) {
      inQueueTransaction(grid, queue, neighbor.row, neighbor.col)    
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

function inQueueTransaction(algGrid, queue, row, col) {
  algGrid[row][col].state = "in_queue";
  queue.push({row: row, col: col});
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