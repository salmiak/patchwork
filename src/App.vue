<template>
  <div id="app" :class="{isPlayer1: currentPlayer.index === 0, isPlayer2: currentPlayer.index === 1}">
    <div class="boardsArea">
      <template v-for="player in $store.state.players">
        <div v-if="currentPlayer.index === player.index" :key="player.index" :class="[`player${player.index}`]" class="boardContainer isActive">
          <h2>{{currentPlayer.name}}'s turn</h2>
          <p>
            <i class="fal fa-bullseye" /> {{currentPlayer.buttonsInPocket}}
          </p>
          <quilt-board :tile="tile" :player="currentPlayer" @tilestored="tileStored" />
        </div>

        <div v-if="otherPlayer.index === player.index" :key="player.index" :class="[`player${player.index}`]" class="boardContainer">
          <h3>{{otherPlayer.name}}</h3>
          <p>
            <i class="fal fa-bullseye" /> {{otherPlayer.buttonsInPocket}}
          </p>
          <quilt-board-mini :player="otherPlayer" />
        </div>
      </template>

      <div class="boardContainer">
        <play-board />
        <button v-if="!miniTile" @click="goForward">Go forward</button>
      </div>
    </div>

    <tile-list @tileselected="tileSelected" />

    <!--<button @click="$store.commit('gameOver')">Debug: End game</button>-->

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
body {
  background: #566;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
button {
  border: none;
  background: lightgreen;
  padding: 0 1em;
  line-height: 2em;
  border-radius: 4px;
  box-shadow: 0 2px 6px fade(black, 30%);
  font-family: inherit;
  font-size: inherit;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 95%;
  min-width: 800px;
  max-width: 1024px;
  padding: 1px 0;
  background: #F5F5F5;
  border-radius: 6px;
  box-shadow: 0 4px 32px fade(black, 80%), 0 16px 64px fade(black, 24%);
  &.isPlayer1 {
    background: lighten(lightgreen, 10%);
  }
  &.isPlayer2 {
    background: lightyellow;
  }
}
.boardsArea {
  display: flex;
  width: 95%;
  margin: 2.5vh auto;
  justify-content: space-between;
  align-items: center;
  .boardContainer {
    text-align: center;
    // outline: 1px solid red;
    &.player0 { order: 1 }
    &.player1 { order: 3 }
    &:nth-child(3) {
      order: 2;
    }
  }
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
