<template>
    <td :class="nodeClass"></td>
</template>

<script>
export default {
  name: "Node",

  props: ["node"],

  data() {
    return {
    }
  },

  computed: {
    nodeClass() {
      if (this.node.type === "start" ) {
        return "node-start"
      }

      if (this.node.type === "finish" ) {
        return "node-finish"
      }

      if (this.node.type === "wall" ) {
        return "node-wall"
      }

      return "node-" + this.node.state;
    },

  }
}
</script>

<style scoped>
td{
  width: 25px;
  height: 25px;
  border: 1px solid rgb(175, 216, 248);
}

.node-unvisited{
  background-color:white
}

.node-finish {
  background-color: red;
}

.node-start {
  background-color: green;
}

.node-visited {
    background-color:rgba(0, 190, 218, 0.75);
}

.node-wall {
  background-color: rgb(12, 53, 71);
}

.node-shortest-path {
  animation-name: shortestPath;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes shortestPath {
  0% {
    transform: scale(0.6);
    background-color: rgb(255, 254, 106);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(255, 254, 106);
  }

  100% {
    transform: scale(1);
    background-color: rgb(255, 254, 106);
  }
}
</style>