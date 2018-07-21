<template>
  <div :class="{hit: hit}" class="board" @mouseout="resetAllCells()">
    <div v-for="(row,index) in board" v-bind:key="`row-${index}`" class="row">
      <div v-for="(cell,index) in row" v-bind:key="`cell-${index}`" :class="{filled:cell.value, hovered:cell.hovered}" class="cell"  @mouseover="mouseOver(cell)" @click="storeTile" @contextmenu.prevent="rotateTile($event)">&nbsp;</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'QuiltBoard',
  props: ['tile'],
  data () {
    return {
      board: [[0]],
      cells: [],
      boardSize: 9,
      hit: false,
      storeCount: 0,
      cursor: {}
    }
  },
  watch: {
    tile () {
      this.mouseOver()
    }
  },
  created () {
    let board = []
    for (var y=0; y < this.boardSize; y++) {
      let row = []
      for (var x=0; x < this.boardSize; x++) {
        var cell = {
          id: ''+x+y,
          x: x,
          y: y,
          value: 0
        }
        row.push(cell)
        this.cells.push(cell)
      }
      board.push(row)
    }
    this.board = board
  },
  methods: {
    getCellAt (x,y) {
      return _.find(this.cells, {x:x, y:y})
    },
    mouseOver (cell) {
      if (!this.tile) {
        return false
      }

      cell = cell || this.cursor
      this.cursor = {
        x: Math.min(Math.max(cell.x, this.tile.offset.x), this.boardSize - (this.tile.pattern[0].length - this.tile.offset.x)),
        y: Math.min(Math.max(cell.y, this.tile.offset.y), this.boardSize - (this.tile.pattern.length - this.tile.offset.y))
      }
      this.highlightCells()
    },
    highlightCells () {
      this.resetAllCells()
      this.tile.pattern.forEach((row,dy) => {
        row.forEach((tileCell,dx) => {
          if(tileCell) {
            var curCell = this.getCellAt(this.cursor.x + dx - this.tile.offset.x, this.cursor.y + dy - this.tile.offset.y)
            if (curCell) {
              this.$set(curCell, "hovered", 1)
              this.hit = this.hit || curCell.value
            }
          }
        })
      })
    },
    storeTile () {
      if (!this.tile) {
        return false
      }

      if (!this.hit) {
        this.cells.forEach(cell => {
          cell.value = cell.hovered || cell.value
        })
        this.storeCount++
        this.resetAllCells()
        this.$emit('tilestored', this.tile)
      }
    },
    rotateTile () {
      if (!this.tile) {
        return false
      }

      var newPattern = []
      for (var i = 0; i < this.tile.pattern[0].length; i++) {
        newPattern.push(new Array(this.tile.pattern.length))
      }
      this.tile.pattern.forEach((row,y) => {
        row.forEach((cell,x) => {
          newPattern[newPattern.length-x-1][y] = cell
        })
      })
      this.$set(this.tile, "pattern", newPattern)
      this.mouseOver()
      return false
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

<style lang="less" scoped>
@import '../assets/base.less';
@fontSize: 1px;
.board {
  width: @quiltBoardCells * @size;
  height: @quiltBoardCells * @size;
  border: 1px solid #DDD;
  box-sizing: content-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  align-content: stretch;
  &.hit {
    border-color: red;
  }
  .row {
    width: 100%;
    height: @size;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: stretch;
    align-content: stretch;
  }
  .cell {
    display: block;
    width: @size;
    height: @size;
    border: 1px solid #DDD;
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
}
</style>
