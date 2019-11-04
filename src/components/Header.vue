<template>
  <header class="header">
    <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
      <a class="navbar-brand" href="#">Path Finding</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          
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
            <button class="btn btn-outline-primary" type="button" v-if="selectedAlgorithm.title != undefined" @click="runAlgorithm(selectedAlgorithm.key)">Run {{ this.selectedAlgorithm.title }}!</button>
            <button class="btn btn-outline-primary" type="button" v-else disabled="true">Select algorithm</button>
          </li>
          <li class="nav-item"><a class="nav-link"  href="#">Clear Board</a></li>
          <li class="nav-item"><a class="nav-link"  href="#">Clear Walls</a></li>
          <li class="nav-item"><a class="nav-link"  href="#">Clear Search Result</a></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      selectedAlgorithm: {},
      algorithms: [
        { 
          title: "Dijkstra's Algorithm",
          key: "dijkstra"
        },
      ],
      patterns: [
        {
          title: "Recursive Division",
          key: "Recursive Division"
        },
        {
          title: "Simple Stair",
          key: "Simple Stair"
        },
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

    runAlgorithm(key) {
       this.$emit('run-algorithm', key);
    },
  },
}
</script>

<style scoped>
</style>