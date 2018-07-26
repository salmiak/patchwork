<template>
  <div id="app">
    <h2>{{currentPlayer.name}}'s turn ({{currentPlayer.buttonsInPocket}})</h2>
    <quilt-board :tile="tile" @tilestored="tileStored" />
    <play-board :player1="players[0].pos" :player2="players[1].pos" />
    <tile-list :tile-id-array="tileIdArray" :current-player="currentPlayer" @tileselected="tileSelected" />
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
      tileIdArray: _.shuffle(_.range(tiles.length)),
      players: [
        {
          name: 'Green player',
          pos: 0,
          buttonsOnBoard: 0,
          buttonsInPocket: 5
        },
        {
          name: 'Yellow player',
          pos: 0,
          buttonsOnBoard: 0,
          buttonsInPocket: 5
        }
      ],
      playing: 0
    }
  },
  computed: {
    currentPlayer () {
      return this.players[this.playing]
    },
    otherPlayer () {
      return this.players[(this.playing+1)%2]
    }
  },
  methods: {
    tileSelected (tile) {
      this.tile = tile
    },
    tileStored (tile) {
      this.currentPlayer.pos += tile.time
      this.currentPlayer.buttonsInPocket -= tile.cost
      if (this.currentPlayer.pos > this.otherPlayer.pos) {
        this.playing = (this.playing+1)%2
      }
      this.removeTileFromArray(tile)
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
