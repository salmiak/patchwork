<template>
  <div id="app" :class="{isPlayer1: currentPlayer.index === 0, isPlayer2: currentPlayer.index === 1}">
    <div class="boardsArea">
      <template v-for="player in $store.state.players">

        <div v-if="currentPlayer.index === player.index" :key="player.index" :class="[`player${player.index}`]" class="boardContainer isActive">
          <h2>{{currentPlayer.name}}'s turn</h2>
          <p>
            <i class="fal fa-bullseye" /> {{currentPlayer.buttonsInPocket}}
          </p>
          <quilt-board :tile="tile" :player="currentPlayer" />
          <div v-if="tile" class="quiltBoardToolbar">
            <tile-mini :tile-data="tile" />
            <button @click="mirrorTile">Mirror Tile</button>
            <button @click="rotateTile">Rotate Tile</button>
          </div>
          <div v-else class="quiltBoardToolbar">
            Select a tile or go forward.
          </div>
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

    <tile-list />

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
import TileMini from './components/TileMini.vue'

export default {
  name: 'app',
  components: {
    QuiltBoard,
    QuiltBoardMini,
    PlayBoard,
    TileList,
    TileMini
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
    tile () {
      return this.$store.state.currentTile
    },
    miniTile () {
      return this.$store.state.miniTile
    }
  },
  created () {
    this.$store.commit('generateBoards')
  },
  methods: {
    mirrorTile () {
      this.$store.commit('mirrorTile')
    },
    rotateTile () {
      this.$store.commit('rotateTile')
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
@import './assets/base.less';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  background: @cBackground;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
button {
  border: none;
  background: @cButton;
  color: @cButtonLabel;
  font-weight: 600;
  padding: 0 1em;
  line-height: 2em;
  border-radius: 16px;
  font-family: inherit;
  font-size: inherit;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @cText;
  width: 95%;
  min-width: 800px;
  max-width: 1024px;
  padding: 1px 0;
  border-radius: 6px;
  box-shadow: 0 4px 32px fade(black, 80%), 0 16px 64px fade(black, 24%);
  &.isPlayer1 {
    background: @cGreenBg;
  }
  &.isPlayer2 {
    background: @cYellowBg;
  }
}
.boardsArea {
  display: flex;
  width: 95%;
  margin: 2.5vh auto;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
  .boardContainer {
    flex-grow: 1;
    text-align: center;
    &.player0 { order: 1 }
    &.player1 { order: 3 }
    &:nth-child(3) {
      order: 2;
      align-self: center;
    }
  }
}
.quiltBoardToolbar {
  height: @miniCellSize * 9;
  line-height: @miniCellSize * 7;
  border-radius: @miniCellSize * 9;
  padding: @miniCellSize;
  background: @cLightSurface;
  button {
    margin-right: 10px;
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
