import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import tiles from '../assets/tiles.json'

Vue.use(Vuex)

const quiltBoardSize = 9
const maxPos = 53

const store = new Vuex.Store({
  state: {
    gameOver: false,
    currentlyPlaying: 0,
    players: [
      {
        index: 0,
        name: 'Green player',
        pos: 0,
        buttonsOnBoard: 0,
        buttonsInPocket: 5,
        board: [[0]],
        cells: [],
        boardPenalty: 0,
        endScore: 0
      },
      {
        index: 1,
        name: 'Yellow player',
        pos: 0,
        buttonsOnBoard: 0,
        buttonsInPocket: 5,
        board: [[0]],
        cells: [],
        boardPenalty: 0,
        endScore: 0
      }
    ],
    tileIdArray: _.concat(0, _.shuffle(_.range(1, tiles.length))),
    miniTile: false,
    currentTile: undefined,
    patchesPos: [20, 26, 32, 44, 50],
    patches: [20, 26, 32, 44, 50],
    buttons: [4, 10, 16, 22, 28, 34, 40, 46, 52]
  },
  getters: {
    currentPlayer: state => {
      return state.players[state.currentlyPlaying]
    },
    currentNotPlayer: state => {
      return state.players[(state.currentlyPlaying + 1) % 2]
    },
    tileArray: state => {
      return _.map(state.tileIdArray, i => { return tiles[i] })
    },
    getCellAt: (state) => ({x, y, pnr}) => {
      return _.find(state.players[pnr].cells, {x:x, y:y})
    }
  },
  mutations: {
    generateBoards (state) {
      state.players.forEach(player => {
        let board = []
        for (var y=0; y < quiltBoardSize; y++) {
          let row = []
          for (var x=0; x < quiltBoardSize; x++) {
            var cell = {
              id: ''+x+y,
              x: x,
              y: y,
              value: 0,
              lastMove: false
            }
            row.push(cell)
            player.cells.push(cell)
          }
          board.push(row)
        }
        player.board = board
      })
    },
    hoverCell (state, {cell, button}) {
      Vue.set(cell, 'hovered', button?2:1)
    },
    unhoverAllCells (state) {
      state.players.forEach(player => {
        player.cells.forEach(cell => {
          Vue.set(cell, "hovered", 0)
        })
      })
    },
    setCurrentTile (state, tile) {
      if (state.miniTile) {
        // eslint-disable-next-line
        console.log('You have to play this tile')
        return false
      }
      state.currentTile = tile
    },
    setMinitTile (state) {
      var miniTile = {
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
      this.commit('setCurrentTile', miniTile)
      state.miniTile = true
    },
    resetTiles (state) {
      state.currentTile = undefined
      state.miniTile = false
    },
    mirrorTile (state) {
      if (!state.currentTile) {
        return false
      }
      var newPattern = []
      state.currentTile.pattern.forEach((row) => {
        newPattern.push(_.reverse(row))
      })
      Vue.set(state.currentTile, "pattern", newPattern)
    },
    rotateTile (state) {
      if (!state.currentTile) {
        return false
      }
      var newPattern = []
      for (var i = 0; i < state.currentTile.pattern[0].length; i++) {
        newPattern.push(new Array(state.currentTile.pattern.length))
      }
      state.currentTile.pattern.forEach((row,y) => {
        row.forEach((cell,x) => {
          newPattern[newPattern.length-x-1][y] = cell
        })
      })
      Vue.set(state.currentTile, "pattern", newPattern)
    },
    storeTile (state) {
      var tile = state.currentTile
      state.players.forEach(player => {
        player.cells.forEach(cell => {
          cell.lastMove = !!cell.hovered || cell.lastMove
          cell.value = cell.hovered || cell.value
        })
      })
      this.commit('unhoverAllCells')
      this.commit('resetTiles')
      this.commit('removeTileFromArray', tile)
      // this.commit('balancePlayersPocket', -1 * tile.cost)
      state.players[state.currentlyPlaying].buttonsInPocket += -1 * tile.cost
      // this.commit('increasePlayersBoardButtons', tile.buttons)
      state.players[state.currentlyPlaying].buttonsOnBoard += tile.buttons
      this.commit('increasePlayerProgress', tile.time)
    },
    removeTileFromArray (state, tile) {
      var toEnd = state.tileIdArray.splice(0, state.tileIdArray.indexOf(tile.id))
      state.tileIdArray = _.chain(state.tileIdArray).concat(toEnd).without(tile.id).value()
    },
    balancePlayersPocket (state, amount) {
      state.players[state.currentlyPlaying].buttonsInPocket += amount
    },
    increasePlayersBoardButtons (state, amount) {
      state.players[state.currentlyPlaying].buttonsOnBoard += amount
    },
    increasePlayerProgress (state, steps) {
      var curPlayer = state.players[state.currentlyPlaying]
      var oldPos = curPlayer.pos

      curPlayer.pos += steps
      curPlayer.pos = Math.min(curPlayer.pos, maxPos)

      state.buttons.forEach(button => {
        if (oldPos <= button && curPlayer.pos > button) {
          curPlayer.buttonsInPocket += curPlayer.buttonsOnBoard
        }
      })
      if (state.patches[0] <= curPlayer.pos) {
        this.commit('setMinitTile')
        state.patches.shift()
      } else if (curPlayer.pos + this.getters.currentNotPlayer.pos >= maxPos * 2) {
        this.commit('gameOver')
      } else if (curPlayer.pos > this.getters.currentNotPlayer.pos) {
        this.commit('nextPlayer')
      }
    },
    nextPlayer (state) {
      state.currentlyPlaying = (state.currentlyPlaying + 1) % 2
      state.players[state.currentlyPlaying].cells.forEach(cell => {
        cell.lastMove = false
      })
    },
    gameOver (state) {
      state.gameOver = true
      state.players.forEach(player => {
        var cellsFilled = _.sumBy(player.cells, cell => {
          return cell.value?1:0;
        })
        player.boardPenalty = (quiltBoardSize * quiltBoardSize - cellsFilled) * 2
        player.endScore = player.buttonsInPocket - player.boardPenalty
      })
    },
    storeLoadGame (state, gameData) {
      gameData.state.players.forEach(player => {
        player.cells = _.map(player.cellsZipped, cell => {
          return {
            id: cell[0],
            x: cell[1],
            y: cell[2],
            value: cell[3]
          }
        })
        delete player.cellsZipped
        player.board = _.chunk(player.cells, quiltBoardSize)
      })
      _.forIn(gameData.state, (val, key) => {
        Vue.set(state, key, _.cloneDeep(val))
      })
    },
    initNewState (state, gameData) {
      _.forIn(_.omit(gameData, ['players']), (val, key) => {
        Vue.set(state, key, _.cloneDeep(val))
      })

      if (gameData.players){
        state.players.forEach( (player, index) => {
          var gameDataPlayer = gameData.players[index]
          player.buttonsOnBoard = gameDataPlayer.buttonsOnBoard
          player.buttonsInPocket = gameDataPlayer.buttonsInPocket
          player.pos = gameDataPlayer.pos
          gameDataPlayer.cells.forEach((cell, cIndex) => {
            player.cells[cIndex].lastMove = cell.lastMove
            player.cells[cIndex].value = cell.value
          })
        })
      }
    },
    updateState (state, gameData) {
      state.currentlyPlaying = gameData.currentlyPlaying
      state.gameOver = gameData.gameOver
      state.miniTile = gameData.miniTile
      state.patches = gameData.patches
      state.tileIdArray = gameData.tileIdArray

      state.players.forEach( (player, index) => {
        var gameDataPlayer = gameData.players[index]
        player.buttonsOnBoard = gameDataPlayer.buttonsOnBoard
        player.buttonsInPocket = gameDataPlayer.buttonsInPocket
        player.pos = gameDataPlayer.pos
        gameDataPlayer.cells.forEach((cell, cIndex) => {
          player.cells[cIndex].lastMove = cell.lastMove
          player.cells[cIndex].value = cell.value
        })
      })

      if(gameData.gameOver) {
        this.commit('gameOver')
      }
    }
  }
})
export default store
