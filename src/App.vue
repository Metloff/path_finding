<template>
  <div id="app">
    <Header @run-algorithm="runAlgorithm"
            @create-pattern="createPattern">
    </Header>
    <Board :grid="grid"></Board>
  </div>
</template>

<script>
import Header from "./components/Header"
import Board from "./components/Board"
import {dijkstra} from './algorithms/dijkstra';

export default {
  name: 'app',
  components: {
    Board, Header
  },

  data() {
    return {
      grid: [],
      start: {x: 0, y: 0},
      finish: {x: 0, y: 0},
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
            type: "cell"
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

    createPattern(PatternName) {
      window.console.log(PatternName);
    },

    // PROCESS
    runAlgorithm(algorithmName) {
      switch (algorithmName) {
      case "dijkstra":
        this.visualizeDijkstra();
        break;
      default:
        alert( "Select algorithm" );
      }
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

    animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
        setTimeout(() => {
          let row = nodesInShortestPathOrder[i].row;
          let col = nodesInShortestPathOrder[i].col;
          this.grid[row][col].state = "shortest-path"
        }, 100 * i);
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
</style>
