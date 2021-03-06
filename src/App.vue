<template>
  <div id="app">
    <Header @run-algorithm="runAlgorithm"
            @create-pattern="createPattern"
            @clear-board="clearBoard"
            @clear-walls="clearWalls"
            @clear-search-result="clearSearchResult"
            @change-mode="changeMode"
            >
    </Header>

    <table class="board">
      <tr v-for="(row, idx) in grid" :key="idx"> 
        <Node v-for="col in row" 
              :key="col.id" 
              :node="col"
              @mouse-down="handleMouseDown"
              @mouse-enter="handleMouseEnter"
              @mouse-up="handleMouseUp"
              >
        </Node>
      </tr>
    </table>
  </div>
</template>

<script>
import Header from "./components/Header"
import Node from "./components/Node"

import {dijkstra} from './algorithms/dijkstra2';
import {astar} from './algorithms/astar';
import {recursive} from './patterns/recursive'

export default {
  name: 'app',
  components: {
    Node, Header
  },

  data() {
    return {
      grid: [],
      start: {x: 0, y: 0},
      finish: {x: 0, y: 0},
      mouseIsPressed: false,
      mode: 'simple',
    }
  },

  created() {
    this.createGrid();
  },

  methods: { 
    // INIT
    createGrid() {
      let height = Math.floor(window.innerHeight / 28);
      let width = Math.floor(window.innerWidth / 25);

      const grid = [];

      for (let row = 0; row < height; row++) {
        const currentRow = [];

        for (let col = 0; col < width; col++) {
          let curCol = {
            col,
            row,
            id: `${row}-${col}`,
            state: "unvisited",
            type: "cell",
            weight: 1,
          }

          if (row === Math.floor(height / 2) && col === Math.floor(width / 4)) {
            this.start.x = col;
            this.start.y = row;
            curCol.type = "start";
          } else if (row === Math.floor(height / 2) && col === Math.floor(3 * width / 4)) {
            this.finish.x = col;
            this.finish.y = row;
            curCol.type = "finish";
          }

          currentRow.push(curCol);
        }

        grid.push(currentRow);
      }

      this.grid = grid;
    },

    // PROCESS
    runAlgorithm(algorithmName) {
      switch (algorithmName) {
      case "dijkstra":
        this.visualizeDijkstra();
        break;
      case "astar":
        this.visualizeAstar();
        break;
      default:
        alert( "Select algorithm" );
      }
    },

    createPattern(patternName) {
      switch (patternName) {
      case "Vertical Recursive Division":
        this.visualizeRecursive("vertical");
        break;
      case "Horizontal Recursive Division":
        this.visualizeRecursive("horizontal");
        break;
      default:
        alert( "Select pattern" );
      }
    },

    changeMode(mode) {
      this.mode = mode;
      this.clearBoard();
    },

    clearBoard() {
      this.clearGrid(function(node) {
        node.state = "unvisited";

        if (node.type === "start") { return; }
        if (node.type === "finish") { return; }

        node.type = "cell";
      })
    },

    clearWalls() {
      this.clearGrid(function(node) {
        if (node.type !== "wall") { return; }        
        node.type = "cell";
      })
    },

    clearSearchResult() {
      this.clearGrid(function(node) {
        node.state = "unvisited";
      })
    },

    // EVENT HANDLERS
    handleMouseDown(row, col) {
      this.mouseIsPressed = true;

      if (this.mode === "simple") {
        this.toggleCellType(row, col, "wall");
      } 

      if (this.mode === "weight") {
        this.toggleCellType(row, col, "mountain");
      } 
    },

    handleMouseEnter(row, col) {
      if (!this.mouseIsPressed) return; 

      if (this.mode === "simple") {
        this.toggleCellType(row, col, "wall");
      } 
      
      if (this.mode === "weight") {
        this.toggleCellType(row, col, "mountain");
      }
    },

    handleMouseUp() {
      this.mouseIsPressed = false;
    },

    // VISUALIZE
    visualizeDijkstra() {
      const startNode = this.grid[this.start.y][this.start.x];
      const finishNode = this.grid[this.finish.y][this.finish.x];
      const {visitedNodesInOrder, nodesInShortestPathOrder} = dijkstra(this.grid, startNode, finishNode);

      for (let i = 0; i < visitedNodesInOrder.length; i++) {        
        setTimeout(() => {
          let row = visitedNodesInOrder[i].row;
          let col = visitedNodesInOrder[i].col;
          this.grid[row][col].state = "visited"
        }, 5 * i);

        if (i == visitedNodesInOrder.length - 1) {
          setTimeout(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
          }, 5 * i);

          return;
        }
      }
    },

    visualizeAstar() {
      const startNode = this.grid[this.start.y][this.start.x];
      const finishNode = this.grid[this.finish.y][this.finish.x];
      const {visitedNodesInOrder, nodesInShortestPathOrder} = astar(this.grid, startNode, finishNode);

      for (let i = 0; i < visitedNodesInOrder.length; i++) {        
        setTimeout(() => {
          let row = visitedNodesInOrder[i].row;
          let col = visitedNodesInOrder[i].col;
          this.grid[row][col].state = "visited"
        }, 5 * i);

        if (i == visitedNodesInOrder.length - 1) {
          setTimeout(() => {
            this.animateShortestPath(nodesInShortestPathOrder);
          }, 5 * i);

          return;
        }
      }
    },

    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          let row = nodesInShortestPathOrder[i].row;
          let col = nodesInShortestPathOrder[i].col;
          this.grid[row][col].state = "shortest-path"
        }, 100 * i);
      }
    },

    visualizeRecursive(orientation) {
      const startNode = this.grid[this.start.y][this.start.x];
      const finishNode = this.grid[this.finish.y][this.finish.x];
      const createdWallsInOrder = recursive(this.grid, startNode, finishNode, orientation);

      for (let i = 0; i < createdWallsInOrder.length; i++) {        
        setTimeout(() => {
          // TODO: исправить underfined в createdWallsInOrder.
          let row = createdWallsInOrder[i].row;
          let col = createdWallsInOrder[i].col;
          let node = this.grid[row][col];

          if (node.type === "start") { return; }
          if (node.type === "finish") { return; }

          node.state = "wall"
        }, 5 * i);
      }
    },

    // UTILS
    toggleCellType(row, col, type) {
      const node = this.grid[row][col];
      if (node.type === "start") { return; }
      if (node.type === "finish") { return; }

      if (type === "wall") {
        if (node.type === "wall") {
          node.type = "cell";
        } else if (node.type === "cell"){
          node.type = "wall";
        }
      }

      if (type === "mountain") {    
        this.createMountainWalls(node);
      }
    },

    createMountainWalls(node) {
      if (node.type === "mountain") { return; }

      let row = node.row;
      let col = node.col;

      // Create mountain.
      node.type   = "mountain";
      node.weight = 500;

      // Create hills.
      if (row > 0)                        this.createHillCell(row - 1, col);
      if (row < this.grid.length - 1)     this.createHillCell(row + 1, col);
      if (col > 0)                        this.createHillCell(row, col - 1);
      if (col < this.grid[0].length - 1)  this.createHillCell(row, col + 1);
    },

    createHillCell(row, col) {
      const node = this.grid[row][col];
      if (node.type === "mountain") { return; }

      node.weight = 100;

      if (node.type === "start") { return; }
      if (node.type === "finish") { return; }

      node.type = "hill";
    },

    clearGrid(func) {
       for (const row of this.grid) {
        for (const node of row) {
          func(node);
        }
      }
    }
  },

}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
  }

  body {
    margin: 0px;
  }

  .board{
    border-collapse:collapse;
    margin-left: 5px;
    margin-right: 5px;
  }
</style>
