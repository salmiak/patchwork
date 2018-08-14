<template>
  <div id="app" :class="{isPlayer1: currentPlayer.index === 0, isPlayer2: currentPlayer.index === 1}">
    <div class="store">
      <button class="small" @click="storeGame"><i class="fal fa-save" /> Save game</button>
      <button class="small" @click="showStoredGames"><i class="fal fa-arrow-up"  /> Load game</button>
    </div>
    <div class="boardsArea">
      <template v-for="player in $store.state.players">

        <div v-if="currentPlayer.index === player.index" :key="player.index" :class="[`player${player.index}`]" class="boardContainer isActive">
          <h2>{{currentPlayer.name}} <span><i class="fal fa-bullseye" /> {{currentPlayer.buttonsInPocket}}</span></h2>
          <quilt-board :tile="tile" :player="currentPlayer" />
          <div v-if="tile" class="quiltBoardToolbar">
            <tile-mini :tile-data="tile" />
            <template v-if="$store.state.miniTile">
              Place this tile to continue.
            </template>
            <template v-else>
              <button @click="mirrorTile"><i class="fal fa-sync" /> Mirror Tile</button>
              <button @click="rotateTile"><i class="fal fa-sync" /> Rotate Tile</button>
            </template>
          </div>
          <div v-else class="quiltBoardToolbar">
            <center>
              Select a tile or go forward.
            </center>
          </div>
        </div>

        <div v-if="otherPlayer.index === player.index" :key="player.index" :class="[`player${player.index}`]" class="boardContainer">
          <h2>{{otherPlayer.name}} <span><i class="fal fa-bullseye" /> {{otherPlayer.buttonsInPocket}}</span></h2>
          <quilt-board-mini :player="otherPlayer" />
        </div>
      </template>

      <div class="boardContainer">
        <play-board />
        <button v-if="!miniTile" @click="goForward"><i class="fal fa-arrow-right" /> Go forward</button>
      </div>
    </div>

    <tile-list />

    <div v-if="!currentlyPlaying && !isGameOver" class="overlay">
      Wait
    </div>

    <div v-if="gameFull" class="overlay">
      Game full - reload url to try again.
    </div>

    <!-- <button @click="$store.commit('gameOver')">Debug: End game</button> -->

    <div v-if="isGameOver" class="gameOver overlay">
      <h3>Game Over</h3>
      <h1 v-if="winningPlayer">
        The winner is {{winningPlayer}}
      </h1>
      <h1 v-else>
        It's a tie!!
      </h1>
      <div class="playersContainer">
        <div v-for="p in $store.state.players" :key="p.index" class="player">
          <h3>{{p.name}}</h3>
          <quilt-board-mini :player="p" />
          <ul>
            <li>
              <strong>Buttons</strong> {{p.buttonsInPocket}}
            </li>
            <li>
              <strong>Penalty</strong> {{p.boardPenalty}}
            </li>
            <li>
              <strong>Total</strong> {{p.endScore}}
            </li>
          </ul>
        </div>
      </div>
      <button @click="resetGame">Reset Game</button>
    </div>

    <div v-if="storedGamesList" class="gameList overlay">
      <h3>Click a game to load it</h3>
      <ul>
        <li v-for="game in storedGamesList" :key="game.id">
          <span @click="loadGame(game.id)">{{game.name}}, {{game.date}}</span>  <i class="fal fa-trash" @click="removeStoredGame(game.id)" />
        </li>
      </ul>
      <button @click="storedGamesList=undefined">Close list</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
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
  data () {
    return {
      storedGamesList: undefined,
      gameFull: false,
      gameData: undefined
    }
  },
  computed: {
    isServerGame () {
      return !!this.$route.params.gameSession
    },
    currentlyPlaying () {
      if (this.isServerGame) {
        return this.gameData && this.$store.state.currentlyPlaying === this.gameData.playerIndex
      }
      return true
    },
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
    },
    isGameOver () {
      return this.$store.state.gameOver
    }
  },
  watch: {
    currentlyPlaying (newVal, oldVal) {
      if (oldVal && this.isServerGame) {
        console.log('I just completed my play, ping-syncing my state')
        this.$socket.emit('stateSyncPing', this.$store.state)
      }
    },
    isGameOver (newVal) {
      if (newVal) {
        console.log('Game over, ping-syncing my state')
        this.$socket.emit('gameOver', this.$store.state)
      }
    }
  },
  created () {
    this.$store.commit('generateBoards')
  },
  sockets:{
    connect () {
      console.log('socket connected')
      if (this.isServerGame) {
        console.log('It is a server game with the hash: ' + this.$route.params.gameSession)
        this.$socket.emit('connect to', this.$route.params.gameSession)
      } else {
        console.log('Ignoring connection, this is a local game only')
      }
    },
    gameFull () {
      this.gameFull = true
    },
    gameInit (gameData) {
      this.gameData = gameData
      if (gameData.shared.state) {
        console.log('We have a previous state, set this up')
        this.$store.commit('initNewState', gameData.shared.state)
      } else if (gameData.playerIndex === 0) {
        console.log('We do not have a state and I am the first player, send my state')
        this.$socket.emit('init state', _.pick(this.$store.state, [ 'tileIdArray']))
      }
    },
    initNewState (state) {
      console.log('got new state, replacing old')
      this.$store.commit('initNewState', state)
    },
    stateSyncPong (state) {
      if (this.isServerGame) {
        console.log('I just received a new state')
        this.$store.commit('updateState', state)
      }
    }
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
    },
    storeGame () {
      let name = window.prompt('Give you game a name') || 'No name'
      let timestamp = (new Date()).getTime()
      let id = "pw_game_"+timestamp

      let stateToStore = _.cloneDeep(this.$store.state)
      stateToStore.players.forEach(player => {
        delete player.board
        player.cellsZipped = _.map(player.cells, cell => {
          return [cell.id, cell.x, cell.y, cell.value]
        })
        delete player.cells
      })
      let gameToStore = {
        name: name,
        id: id,
        timestamp: timestamp,
        state: stateToStore
      }
      this.$cookies.set(id,btoa(JSON.stringify(gameToStore)))

      let gamesList = this.$cookies.isKey('pw_games_list')?JSON.parse(atob(this.$cookies.get('pw_games_list'))):[]
      gamesList.push({
        name: name,
        timestamp: timestamp,
        id: id
      });
      this.$cookies.set('pw_games_list',btoa(JSON.stringify(gamesList)))
    },
    showStoredGames () {
      this.storedGamesList = JSON.parse(atob(this.$cookies.get('pw_games_list')))
      this.storedGamesList.forEach(game => {
        game.date = (new Date(game.timestamp)).toLocaleString()
      })
    },
    loadGame (id) {
      let gameData = JSON.parse(atob(this.$cookies.get(id)))
      this.$store.commit('storeLoadGame', gameData)
      this.storedGamesList = undefined
    },
    removeStoredGame (id) {
      this.$cookies.remove(id)
      let gamesList = JSON.parse(atob(this.$cookies.get('pw_games_list')))
      gamesList = _.reject(gamesList, {id: id})
      this.storedGamesList = _.reject(this.storedGamesList, {id: id})
      this.$cookies.set('pw_games_list',btoa(JSON.stringify(gamesList)))
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
html {
  font-size: 16px;
}
body {
  background: @cBackground;
  display: flex;
  width: 100vw;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
h2,h3 {
  margin: 0;
  font-size: 1.2rem;
  span {
    font-size: 1rem;
    padding-left: .7rem;
    margin-left: .5rem;
    border-left: 1px solid @cText;
  }
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
  .fal {
    margin-left: -.3em;
    margin-right: .3em;
  }
}
#app {
  position: relative;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @cText;
  width: 95%;
  min-width: 800px;
  max-width: 1024px;
  padding: 1px 0;
  margin: 1rem auto 4rem;
  border-radius: 6px;
  box-shadow: 0 4px 32px fade(black, 80%), 0 16px 64px fade(black, 24%);
  &.isPlayer1 {
    background: @cGreenBg;
  }
  &.isPlayer2 {
    background: @cYellowBg;
  }
}
.store {
  position: absolute;
  bottom: -2.4rem;
  left: 0;
  right: 0;
  text-align: center;
  line-height: 2.3rem;
  button {
    line-height: 1.2rem;
    font-size: .7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 2px;
    color: fade(@cButtonLabel, 60%);
    background: none;
    cursor: pointer;
    &:hover {
      color: @cButtonLabel;
    }
  }
}
.boardsArea {
  display: flex;
  width: 95%;
  margin: 10px auto @miniCellSize;
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
      padding-top: 1rem;
    }
  }
}
.quiltBoardToolbar {
  height: @miniCellSize * 9;
  width: @quiltBoardCells * @quiltBoardCellsSize + @miniCellSize * 9;
  margin: @miniCellSize auto 0;
  line-height: @miniCellSize * 7;
  border-radius: @miniCellSize * 9;
  padding: @miniCellSize;
  background: @cLightSurface;
  text-align: left;
  button {
    margin-right: 6px;
  }
}
.overlay {
  background: fade(#000, 70%);
  color: #FFF;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9000;
  padding: 10vh;
  button {
    background: @cButtonLabel;
    color: @cButton;
  }
}
.gameOver {
  li {
    list-style: none;
    &:last-child {
      font-size: 1.2rem;
      margin-top: .5rem;
    }
  }
  .playersContainer {
    display: flex;
    width: 420px;
    margin: 40px auto 60px;
    justify-content: space-between;
    .player {
      color: @cText;
      width: 200px;
      background: @cYellowBg;
      padding: 20px 0 30px;
      border-radius: 6px;
      &:first-child {
        background: @cGreenBg;
      }
      h3 {
        margin-bottom: 1rem;
        color: @cBackground;
      }
      .board {
        margin: 1rem auto;
      }
    }
  }
}
.gameList {
  h3 {
    margin-bottom: 30px;
  }
  ul {
    margin-bottom: 20px;
  }
  li {
    list-style: none;
    margin-bottom: 10px;
    span:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    i {
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
}
</style>
