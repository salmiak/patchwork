<template>
  <div id="app">
    <h2>{{currentPlayer.name}}'s turn ({{currentPlayer.buttonsInPocket}})</h2>
    <quilt-board :tile="tile" :player="currentPlayer" @tilestored="tileStored" />
    <quilt-board-mini :player="otherPlayer" />
    <play-board />
    <tile-list @tileselected="tileSelected" />
  </div>
</template>

<script>
import _ from 'lodash'
import QuiltBoard from './components/QuiltBoard.vue'
import QuiltBoardMini from './components/QuiltBoardMini.vue'
import PlayBoard from './components/PlayBoard.vue'
import TileList from './components/TileList.vue'
import tiles from './assets/tiles.json'

export default {
  name: 'app',
  components: {
    QuiltBoard,
    QuiltBoardMini,
    PlayBoard,
    TileList
  },
  data () {
    return {
      tile: undefined
    }
  },
  computed: {
    currentPlayer () {
      return this.$store.getters.currentPlayer
    },
    otherPlayer () {
      return this.$store.getters.currentNotPlayer
    }
  },
  methods: {
    tileSelected (tile) {
      this.tile = tile
    },
    tileStored (tile) {
      this.$store.commit('increasePlayerProgress', tile.time)
      this.$store.commit('balancePlayersPocket', -1 * tile.cost)
      // this.currentPlayer.pos += tile.time
      // this.currentPlayer.buttonsInPocket -= tile.cost
      if (this.currentPlayer.pos > this.otherPlayer.pos) {
        this.$store.commit('nextPlayer')
      }
      this.$store.commit('removeTileFromArray', tile)
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
