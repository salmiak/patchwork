import _ from 'lodash'
import Vue from 'vue'
import Vuex from 'vuex'
import tiles from '../assets/tiles.json'

Vue.use(Vuex)

const quiltBoardSize = 9

const store = new Vuex.Store({
  state: {
    currentlyPlaying: 0,
    players: [
      {
        index: 0,
        name: 'Green player',
        pos: 0,
        buttonsOnBoard: 0,
        buttonsInPocket: 5,
        board: [[0]],
        cells: []
      },
      {
        index: 1,
        name: 'Yellow player',
        pos: 0,
        buttonsOnBoard: 0,
        buttonsInPocket: 5,
        board: [[0]],
        cells: []
      }
    ],
    tileIdArray: _.shuffle(_.range(tiles.length)),
    miniTile: false,
    patchesPos: [2, 20, 26, 32, 44, 50],
    patches: [2, 20, 26, 32, 44, 50],
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
    generateBoard (state, pnr) {
      let player = state.players[pnr]
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
    },
    hoverCell (state, {cell}) {
      Vue.set(cell, 'hovered', 1)
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
      state.tileIdArray = _.without(state.tileIdArray, tile.id)
    },
    resetMiniTile (state) {
      state.miniTile = false
    },
    increasePlayerProgress (state, steps) {
      state.players[state.currentlyPlaying].pos += steps
      if (state.patches[0] <= this.getters.currentPlayer.pos) {
        state.miniTile = true
        state.patches.shift()
      } else if (this.getters.currentPlayer.pos > this.getters.currentNotPlayer.pos) {
        this.commit('nextPlayer')
      }
    },
    balancePlayersPocket (state, amount) {
      state.players[state.currentlyPlaying].buttonsInPocket += amount
    },
    nextPlayer (state) {
      state.currentlyPlaying = (state.currentlyPlaying + 1) % 2
    }
  }
})
export default store
