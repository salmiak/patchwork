<template>
  <div id="app">
    <quilt-board :tile="tile" @tilestored="removeTileFromArray" />
    <play-board />
    <tile-list :tile-id-array="tileIdArray" @tileselected="tileSelected" />
  </div>
</template>

<script>
import _ from 'lodash'
import QuiltBoard from './components/QuiltBoard.vue'
import PlayBoard from './components/PlayBoard.vue'
import TileList from './components/TileList.vue'
import tiles from './assets/tiles.json'

export default {
  name: 'app',
  components: {
    QuiltBoard,
    PlayBoard,
    TileList
  },
  data () {
    return {
      tile: undefined,
      tileIdArray: _.shuffle(_.range(tiles.length))
    }
  },
  methods: {
    tileSelected (tile) {
      this.tile = tile
    },
    removeTileFromArray (tile) {
      this.tileIdArray = _.without(this.tileIdArray, tile.id)
      this.tile = undefined
    },
    newTile () {
      var rand = Math.floor(Math.random()*4)
      var id = (new Date()).getTime()
      this.tile = _.clone(tiles[rand])
      this.tile.id = id
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
