<template>
  <div class="board">
    <div v-for="(row,index) in player.board" v-bind:key="`row-${index}-mini`" class="row">
      <div v-for="(cell,index) in row" v-bind:key="`cell-${index}-mini`" :class="{filled:cell.value}" class="cell">&nbsp;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuiltBoardMini',
  props: ['player'],
  data () {
    return {
      boardSize: 9,
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/base.less';
@fontSize: 1px;
@size: @quiltBoardCellsSize*0.25;

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
    &.filled {
      background: #FDD;
    }
  }
}
</style>
