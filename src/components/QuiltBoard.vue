<template>
  <div :class="{hit: hit}" class="board" @mouseout="resetAllCells()">
    <div v-for="(row,index) in player.board" v-bind:key="`row-${index}`" class="row">
      <div v-for="(cell,index) in row" v-bind:key="`cell-${index}`" :class="{filled:cell.value, hovered:cell.hovered, button:cell.value === 2}" class="cell"  @mouseover="mouseOver(cell)" @click="storeTile" @contextmenu.prevent="rotateTile()">&nbsp;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuiltBoard',
  props: ['tile', 'player'],
  data () {
    return {
      boardSize: 9,
      hit: false,
      cursor: {}
    }
  },
  methods: {
    getCellAt (x,y) {
      return this.$store.getters.getCellAt({x:x, y:y, pnr: this.player.index})
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
      this.$store.commit('unhoverAllCells')
      this.hit = false
      this.tile.pattern.forEach((row,dy) => {
        row.forEach((tileCell,dx) => {
          if(tileCell) {
            var curCell = this.getCellAt(this.cursor.x + dx - this.tile.offset.x, this.cursor.y + dy - this.tile.offset.y)
            if (curCell) {
              this.$store.commit('hoverCell', {cell: curCell, button: tileCell===2})
              this.hit = this.hit || curCell.value
            }
          }
        })
      })
    },
    storeTile () {
      if (this.tile && !this.hit) {
        this.$store.commit('storeTile')
        this.$store.commit('unhoverAllCells')
        this.hit = false
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
    },
    resetAllCells () {
      this.$store.commit('unhoverAllCells')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/base.less';
@fontSize: 1px;
@size: @quiltBoardCellsSize;

.board {
  margin: 10px auto;
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
    &.button {
      background: blue;
    }
  }
}
</style>
