<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <a class="navbar-brand" href="#">Path Finding</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <!-- SELECT MODE -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Game Mode
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
               <a class="dropdown-item" href="#" 
                  v-for="m in modes" 
                  :key="m.key"
                  @click="selectMode(m)">
                  {{ m.title }}
                </a>
            </div>
          </li>
          
          <!-- ALGORITHMS -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Algorithms
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
               <a class="dropdown-item" href="#" 
                  v-for="algorithm in algorithms" 
                  :key="algorithm.key"
                  @click="selectAlgorithm(algorithm)">
                  {{ algorithm.title }}
                </a>
            </div>
          </li>
          
          <!-- PATTERNS -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Mazes &amp; Patterns
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
               <a class="dropdown-item" href="#" 
                  v-for="p in patterns" 
                  :key="p.key"
                  @click="selectPattern(p.key)">
                  {{ p.title }}
                </a>
            </div>
          </li>
        </ul>

        <!-- Process buttons -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <button class="btn btn-outline-primary" type="button" v-if="selectedAlgorithm.title != undefined" @click="runAlgorithm(selectedAlgorithm.key)">Run {{ this.selectedAlgorithm.key }}!</button>
            <button class="btn btn-outline-primary" type="button" v-else disabled="true">Select algorithm</button>
          </li>
          <li class="nav-item" ><a class="nav-link" href="#" @click="clearBoard">Clear Board</a></li>
          <!-- <li class="nav-item"><a class="nav-link"  href="#" @click="clearWalls">Clear Walls</a></li> -->
          <li class="nav-item"><a class="nav-link"  href="#" @click="clearSearchResult">Clear Search Result</a></li>
        </ul>
      </div>
    </nav>
    <div>
      <div class="gameModeDescription">
        <ul style="display: block; padding: 0px;">
          <li><h5><mark>{{ currentGameMode.title }}</mark>. {{ currentGameMode.description }}.</h5></li>
          <li><div class="cell start"></div>Start node</li>
          <li><div class="cell finish"></div>Finish node</li>
          <li><div class="cell visited"></div>Visited nodes</li>
          <li><div class="cell unvisited"></div>Unvisited nodes</li>
          <li><div class="cell shortest-path"></div>Shortest-path</li>
          <li v-if="currentGameMode.key == 'simple'"><div class="cell wall"></div>Wall nodes</li>
          <li v-if="currentGameMode.key == 'weight'"><div class="cell mountain"></div><div class="cell hill"></div>Mountain and Hills</li>
        </ul>
      </div>
      <div class="algDescription">
        <h5 v-if="selectedAlgorithm.title != undefined" >
          {{ selectedAlgorithm.description }}
        </h5>
        <h5 v-else> Pick an algorithm and visualize it! </h5>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedAlgorithm: {},

      selectedGameMode: {},
    
      algorithms: [
        { 
          title: "Dijkstra's Algorithm",
          key: "dijkstra",
          description: "Dijkstra's Algorithm is weighted and guarantees the shortest path!",
        },
        { 
          title: "A* Algorithm",
          key: "astar",
          description: "A* Search is weighted and guarantees the shortest path!",
        },
      ],

      patterns: [
        {
          title: "Vertical Recursive Division",
          key: "Vertical Recursive Division"
        },
        {
          title: "Horizontal Recursive Division",
          key: "Horizontal Recursive Division"
        },
      ],

      modes: [
        {
          title: "Simple",
          key: "simple",
          description: "You can draw walls",
        },

        {
          title: "With weight",
          key: "weight",
          description: "You can draw mountains and hills (weighted cells)",
        }
      ],
    }
  },

  methods: {
    selectAlgorithm(algorithm) {
      this.selectedAlgorithm = algorithm;
    },

    selectPattern(key) {
      this.$emit('create-pattern', key);
    },

    selectMode(m) {
      this.selectedGameMode = m;
      this.$emit('change-mode', m.key);
    },

    runAlgorithm(key) {
      this.$emit('run-algorithm', key);
    },

    clearBoard() {
      this.$emit('clear-board');
    },

    clearWalls() {
      this.$emit('clear-walls');
    },

    clearSearchResult() {
      this.$emit('clear-search-result');
    },
  },

  computed: {
    currentGameMode() {
      if (this.selectedGameMode.title == undefined) {
        return this.modes[0];
      } else {
        return this.selectedGameMode;
      }
    }
  }
}
</script>

<style scoped>
  .algDescription {
    margin-bottom: 10px;
  }

  .gameModeDescription {
    margin-top: 10px;
  }

  .gameModeDescription > ul li {
    display: inline-block;
    list-style: none;
    padding: 0px 28px 0px 0px;
  }

  .cell {
    width: 25px;
    height: 25px;
    display: inline-block;
    position: relative;
    top: 0.35em;
    margin: 0px 0.42em;
  }

  .visited {
    background-color:rgba(0, 190, 218, 0.75);
  }

  .unvisited{
    background-color:white;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(175, 216, 248);
    border-image: initial;
  }

  .finish {
    background-color: red;
  }

  .start {
    background-color: green;
  }

  .shortest-path{
    background-color: rgb(41, 173, 71);
  }

  .wall {
    background-color: rgb(12, 53, 71);
  }

  .mountain {
    background-color: rgb(107, 0, 0);
  }

  .hill {
    background-color: rgb(242, 243, 155);
  }
</style>