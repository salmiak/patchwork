<template>
  <div id="app">
    <h2>{{currentPlayer.name}}'s turn ({{currentPlayer.buttonsInPocket}})</h2>
    <quilt-board :tile="tile" :player="currentPlayer" @tilestored="tileStored" />
    <quilt-board-mini :player="otherPlayer" />
    <play-board />
    <button v-if="!miniTile" @click="goForward">Go forward</button>
    <tile-list @tileselected="tileSelected" />
    <button @click="$store.commit('gameOver')">Debug: End game</button>
    <div v-if="$store.state.gameOver" id="gameOver">
      <h3>Game Over</h3>
      <h1 v-if="winningPlayer">
        The winner is {{winningPlayer}}
      </h1>
      <h1 v-else>
        It's a tie!!
      </h1>
      <div v-for="p in $store.state.players" :key="p.index">
        <h3>{{p.name}}</h3>
        <quilt-board-mini :player="p" />
        <ul>
          <li>
            <strong>Buttons</strong> {{p.buttonsInPocket}}
          </li>
          <li>
            <strong>Penelty</strong> {{p.boardPenelty}}
          </li>
          <li>
            <strong>Total</strong> {{p.endScore}}
          </li>
        </ul>
      </div>
      <button @click="resetGame">Reset Game</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
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
    winningPlayer () {
      if (this.$store.state.players[0].endScore === this.$store.state.players[1].endScore) {
        return false
      }
      return _.maxBy(this.$store.state.players, 'endScore').name
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
  created () {
    this.$store.commit('generateBoards')
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
      this.$store.commit('increasePlayersBoardButtons', tile.buttons)
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
    },
    resetGame () {
      window.location.reload()
    }
  }
}
</script>

<style lang="less">
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
#gameOver {
  background: fade(#000, 70%);
  color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9000;
  padding: 20vh;
  li {
    list-style: none;
  }
}
</style>
