<template>
  <table class="board">
    <tr v-for="(row,  idx) in grid" :key="idx"> 
      <Node v-for="col in row" :key="col.id" :node=col></Node>
    </tr>
  </table>
</template>

<script>
import Node from "./Node"

export default {
  name: "Board",

  components: {
      Node
  },

  props: ["grid"],
  methods: {
  },

  computed: {
  }
} 
</script>

<style scoped>
.board{
    border-collapse:collapse;
    margin-left: 5px;
    margin-right: 5px;
}
</style>