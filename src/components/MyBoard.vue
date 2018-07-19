<template>
  <div id="myBoard" :class="{hit: hit}">
    <div v-for="(row,index) in board" v-bind:key="`row-${index}`">
      <span v-for="(cell,index) in row" v-bind:key="`cell-${index}`" :class="{filled:cell.value, hovered:cell.hovered}" @mouseover="mouseOver(cell)" @click="storeTile">&nbsp;</span>
    </div>
    <div>
      {{storeCount}}
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import lodash from 'lodash'
export default {
  name: 'my-board',
  data () {
    return {
      board: [[0]],
      cells: [],
      boardSize: 9,
      hit: false,
      storeCount: 0,
      tile: {
        pattern: [[0,0,1],[1,1,1],[1,0,1]],
        offset: {x: 1, y: 1}
      }
      /*
      tile: {
        pattern: [[0,1,0],[1,1,0],[0,1,0],[0,1,1]],
        offset: {x: 1, y: 2}
      }
      */
    }
  },
  created () {
    let randBoard = []
    for (var y=0; y < this.boardSize; y++) {
      let row = []
      for (var x=0; x < this.boardSize; x++) {
        var cell = {
          id: ''+x+y,
          x: x,
          y: y,
          value: Math.random() > 0.8
        }
        row.push(cell)
        this.cells.push(cell)
      }
      randBoard.push(row)
    }
    this.board = randBoard
  },
  methods: {
    getCellAt (x,y) {
      return _.find(this.cells, {x:x, y:y})
    },
    mouseOver (cell) {
      this.resetAllCells()

      var cursor = {
        x: Math.min(Math.max(cell.x, this.tile.offset.x), this.boardSize - (this.tile.pattern[0].length - this.tile.offset.x)),
        y: Math.min(Math.max(cell.y, this.tile.offset.y), this.boardSize - (this.tile.pattern.length - this.tile.offset.y))
      }

      this.tile.pattern.forEach((row,dy) => {
        row.forEach((tileCell,dx) => {
          if(tileCell) {
            var curCell = this.getCellAt(cursor.x + dx - this.tile.offset.x, cursor.y + dy - this.tile.offset.y)
            if (curCell) {
              this.$set(curCell, "hovered", 1)
              this.hit = this.hit || curCell.value
            }
          }
        })
      })
    },
    storeTile () {
      if (!this.hit) {
        this.cells.forEach(cell => {
          cell.value = cell.hovered || cell.value
        })
        this.storeCount++
      }
    },
    resetAllCells () {
      this.hit = false
      this.cells.forEach(cell => {
        this.$set(cell, "hovered", 0)
      })
    }
  }
}
</script>

<style lang="less">
@cells: 9;
@size: 64px;
@fontSize: 12px;
#myBoard {
  width: @cells * @size;
  height: @cells * @size;
  border: 1px solid #DDD;
  box-sizing: content-box;
  &.hit {
    border-color: red;
  }
}
#myBoard > div > span {
  display: inline-block;
  width: @size;
  height: @size;
  font-size: @fontSize;
  line-height: @fontSize*1.6;
  padding: (@size - @fontSize*1.6*2)/2;
  border: 1px solid #DDD;
  box-sizing: border-box;
  background: #FFF;
  &.hovered {
    background: #CCC;
  }
  &.filled {
    background: #FDD;
    &.hovered {
      background: #CAA;
    }
  }
}
</style>
