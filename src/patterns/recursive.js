const HORIZONTAL      = 'horizontal';
const VERTICAL        = 'vertical';
const GUARD_INTERVAL  = 2;

export function recursive(grid, startNode, finishNode, orientation) {
  // Create own grid
  const pGrid = createPatternGrid(grid)

  let width = pGrid[0].length;
  let height = pGrid.length;

  // Create surrounding walls(frame)
  let surWalls = drawFrame(pGrid, height, width, startNode, finishNode);

  // Create maze recursively. 
  let insideWalls = divide(pGrid, 0, 0, width - 1, height - 1, orientation)

  return [...surWalls, ...insideWalls];
}

function divide(grid, x, y, width, height, orientation) {
  if (width <= 2 || height <= 2)  {
    return;
  }

  let insideWalls     = []; 
  let topOrLeftWalls  = []; 
  let botOrRightWalls = [];
  if (orientation == HORIZONTAL) {
    // Wall coordinates
    // Walls can stay only on even position
    // It allows to not close the aisles(exits/pass)
    let wStartPoint = y + GUARD_INTERVAL;
    let wEndPoint   = wStartPoint + height - 2*GUARD_INTERVAL;
    let wy = getEvenRandomNum(wStartPoint, wEndPoint)

    // Pass coordinates
    // Passes can stay only on odd position
    let pStartPoint = x + 1;
    let pEndPoint   = pStartPoint + width - 2;
    let px = getOddRandomNum(pStartPoint, pEndPoint)

    // Select nodes for wall
    for(const row of grid) {
      for(const node of row) {
        if (node.row === wy && node.col !== px && node.col >= x && node.col <= (x + width)) {
          insideWalls.push(node);
        }
      }
    }

    // Recursively devide top fragments
    topOrLeftWalls = divide(grid, x, y, width, wy - y, chooseOrientation(width, wy - y));

    // Recursively devide bot fragments
    botOrRightWalls = divide(grid, x, wy, width, height - (wy - y), chooseOrientation(width, height - (wy - y)));
  } else {
    // Wall coordinates
    // Walls can stay only on even position. 
    // It allows to not close the aisles(exits/pass). 
    let wStartPoint = x + GUARD_INTERVAL;
    let wEndPoint   = wStartPoint + width - 2*GUARD_INTERVAL;
    let wx = getEvenRandomNum(wStartPoint, wEndPoint);
    
    // Pass coordinates
    // Passes can stay only on odd position
    let pStartPoint = y + 1;
    let pEndPoint   = pStartPoint + height - 2;
    let py = getOddRandomNum(pStartPoint, pEndPoint);

    // Select nodes for wall
    for(const row of grid) {
      for(const node of row) {
        if (node.col === wx && node.row !== py && node.row >= y && node.row <= (y + height)) {
          insideWalls.push(node);
        }
      }
    }

    // Recursively devide left fragments
    topOrLeftWalls = divide(grid, x, y, wx - x, height, chooseOrientation(wx - x, height));
    
    // Recursively devide right fragments
    botOrRightWalls = divide(grid, wx, y, width - (wx - x), height, chooseOrientation( width - (wx - x), height));
  }

  return insideWalls.concat(topOrLeftWalls).concat(botOrRightWalls);
}

function chooseOrientation(width, height) {
  if (width < height) {
    return HORIZONTAL;
  }

  if (width > height) {
    return VERTICAL;
  }

  if (width === height) { 
    return Math.floor(Math.random() * 2) === 1 ? HORIZONTAL : VERTICAL
  }  
}

// Create surrounding walls
function drawFrame(grid, height, width, startNode, finishNode) {
  let relevantIds = [startNode, finishNode];
  let walls = [];

  for (const row of grid) {
    for (const node of row) {
      if (!relevantIds.includes(node)) {
        let r = node.row;
        let c = node.col;

        if (r === 0 || c === 0 || r === height - 1 || c === width - 1) {
          walls.push(node);
        }
      }
    }
  }

  return walls;
}

// Create own grid
function createPatternGrid(grid) {
  const patternGrid = [];

  for (const row of grid) {
    const curRow = [];
    for (const node of row) {
      curRow.push(node);
    }

    patternGrid.push(curRow);
  }

  return patternGrid;
}

function getOddRandomNum(from, to) {
  const oddArr = [];
  if (isEven(from)) {
    from = from + 1;
  }

  for (let i = from; i <= to; i += 2) {
    oddArr.push(i);
  }

  return oddArr[Math.floor(Math.random() * oddArr.length)]
}

function getEvenRandomNum(from, to) {
  const evenArr = [];
  if (!isEven(from)) {
    from = from + 1;
  }

  for (let i = from; i <= to; i += 2) {
    evenArr.push(i);
  }

  return evenArr[Math.floor(Math.random() * evenArr.length)]
}

function isEven(num) { 
  return num % 2 == 0;
}