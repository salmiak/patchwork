<template>
  <div id="app">
    <MyBoard />
  </div>
</template>

<script>
import MyBoard from './components/MyBoard.vue'

export default {
  name: 'app',
  components: {
    MyBoard
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
