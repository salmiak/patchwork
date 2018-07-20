<template>
  <div id="app">
    <MyBoard :tile="tile" @tilestored="newTile" />
  </div>
</template>

<script>
import MyBoard from './components/MyBoard.vue'

export default {
  name: 'app',
  components: {
    MyBoard
  },
  data () {
    return {
      tile: {}
    }
  },
  created () {
    this.newTile()
  },
  methods: {
    newTile () {
      var rand = Math.floor(Math.random()*3)
      switch(rand) {
        case 0:
          this.tile = {
            pattern: [[0,0,1],[1,1,1],[1,0,1]],
            offset: {x: 1, y: 1}
          }
          break
        case 1:
          this.tile = {
            pattern: [[0,1,0],[1,1,0],[0,1,0],[0,1,1]],
            offset: {x: 1, y: 2}
          }
          break
        case 2:
          this.tile = {
            pattern: [[0,1],[1,1]],
            offset: {x: 1, y: 1}
          }
          break
      }
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
