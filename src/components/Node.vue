<template>
  <td :class="nodeClass" 
      @mousedown="mouseDown"
      @mouseenter="mouseEnter"
      @mouseup="mouseUp">
  </td>
</template>

// TODO как использовать константы из одного компонента в другом?
<script>
export default {
  name: "Node",

  props: ["node"],

  data() {
    return {
    }
  },

  methods: {
    mouseDown() {
      this.$emit('mouse-down', this.node.row, this.node.col);
    },

    mouseEnter() {
      this.$emit('mouse-enter', this.node.row, this.node.col);
    },

    mouseUp() {
      this.$emit('mouse-up');
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

      if (this.node.type === "mountain" ) {
        return "node-mountain"
      }

      if (this.node.type === "hill" ) {
        return "node-hill"
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

/* .node-wall {
  background-color: rgb(12, 53, 71);
} */
.node-wall{
  animation-name: wallAnimation;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  border: 1px solid rgb(12, 53, 71);
}

@keyframes wallAnimation {
  0% {
    transform: scale(.3);
    background-color: rgb(12, 53, 71);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(12, 53, 71);
  }

  100% {
    transform: scale(1.0);
    background-color: rgb(12, 53, 71);
  }
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
    background-color: rgb(41, 173, 71);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(41, 173, 71);
  }

  100% {
    transform: scale(1);
    background-color: rgb(41, 173, 71);
  }
}

.node-mountain{
  animation-name: mountainAnimation;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  border: 1px solid rgb(107, 0, 0);
}

@keyframes mountainAnimation {
  0% {
    transform: scale(.3);
    background-color: rgb(107, 0, 0);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(107, 0, 0);
  }

  100% {
    transform: scale(1.0);
    background-color: rgb(107, 0, 0);
  }
}

.node-hill{
  animation-name: hillAnimation;
  animation-duration: 0.3s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
  border: 1px solid rgb(242, 243, 155);
}

@keyframes hillAnimation {
  0% {
    transform: scale(.3);
    background-color: rgb(242, 243, 155);
  }

  50% {
    transform: scale(1.2);
    background-color: rgb(242, 243, 155);
  }

  100% {
    transform: scale(1.0);
    background-color: rgb(242, 243, 155);
  }
}
</style>