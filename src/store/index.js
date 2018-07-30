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
        boardPenelty: 0,
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
        boardPenelty: 0,
        endScore: 0
      }
    ],
    tileIdArray: _.concat(0, _.shuffle(_.range(1, tiles.length))),
    miniTile: false,
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
              value: 0
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
    storeTile (state) {
      state.players.forEach(player => {
        player.cells.forEach(cell => {
          cell.value = cell.hovered || cell.value
        })
      })
    },
    removeTileFromArray (state, tile) {
      var toEnd = state.tileIdArray.splice(0, state.tileIdArray.indexOf(tile.id))
      state.tileIdArray = _.chain(state.tileIdArray).concat(toEnd).without(tile.id).value()
    },
    resetMiniTile (state) {
      state.miniTile = false
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
        state.miniTile = true
        state.patches.shift()
      } else if (curPlayer.pos + this.getters.currentNotPlayer.pos >= maxPos * 2) {
        this.commit('gameOver')
      } else if (curPlayer.pos > this.getters.currentNotPlayer.pos) {
        this.commit('nextPlayer')
      }
    },
    balancePlayersPocket (state, amount) {
      state.players[state.currentlyPlaying].buttonsInPocket += amount
    },
    increasePlayersBoardButtons (state, amount) {
      state.players[state.currentlyPlaying].buttonsOnBoard += amount
    },
    nextPlayer (state) {
      state.currentlyPlaying = (state.currentlyPlaying + 1) % 2
    },
    gameOver (state) {
      state.gameOver = true
      state.players.forEach(player => {
        var cellsFilled = _.sumBy(player.cells, cell => {
          return cell.value?1:0;
        })
        player.boardPenelty = (quiltBoardSize * quiltBoardSize - cellsFilled) * 2
        player.endScore = player.buttonsInPocket - player.boardPenelty
        // eslint-disable-next-line
        console.log(player.board)
      })
    }
  }
})
export default store
