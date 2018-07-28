<template>
  <div id="app">
    <h2>{{currentPlayer.name}}'s turn ({{currentPlayer.buttonsInPocket}})</h2>
    <quilt-board :tile="tile" :player="currentPlayer" @tilestored="tileStored" />
    <quilt-board-mini :player="otherPlayer" />
    <play-board />
    <button v-if="!miniTile" @click="goForward">Go forward</button>
    <tile-list @tileselected="tileSelected" />
  </div>
</template>

<script>
import QuiltBoard from './components/QuiltBoard.vue'
import QuiltBoardMini from './components/QuiltBoardMini.vue'
import PlayBoard from './components/PlayBoard.vue'
import TileList from './components/TileList.vue'

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
    },
    miniTile () {
      return this.$store.state.miniTile
    }
  },
  watch: {
    miniTile (newVal) {
      if (newVal === true) {
        this.tile = {
          'id': null,
          'pattern': [
            [1]
          ],
          'offset': {
            'x': 0,
            'y': 0
          },
          'time': 0,
          'cost': 0,
          'buttons': 0
        }
      }
    }
  },
  methods: {
    tileSelected (tile) {
      if (this.miniTile) {
        // eslint-disable-next-line
        return console.log('you have to play this tile')
      }
      this.tile = tile
    },
    tileStored (tile) {
      this.$store.commit('resetMiniTile')
      this.$store.commit('balancePlayersPocket', -1 * tile.cost)
      this.$store.commit('removeTileFromArray', tile)
      this.tile = undefined
      this.$store.commit('increasePlayerProgress', tile.time)
    },
    goForward () {
      if (this.miniTile) {
        // eslint-disable-next-line
        return console.log('you have to play this tile')
      }
      var diff = 1 + this.$store.getters.currentNotPlayer.pos - this.$store.getters.currentPlayer.pos
      this.$store.commit('balancePlayersPocket', diff)
      this.$store.commit('increasePlayerProgress', diff)
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
