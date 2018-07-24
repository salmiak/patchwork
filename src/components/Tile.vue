<template>
  <div class="tile">
    <div v-for="(row,i) in tileData.pattern" :key="`r${tileData.id}${i}`" class="row">
      <div v-for="(cell,j) in row" :key="`c${tileData.id}${i}${j}`" :class="{filled: cell, button: cell === 2}" class="cell" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: ['tileData']
}
</script>

<style lang="less" scoped>
@import '../assets/base.less';
@size: @quiltBoardCellsSize;
.tile {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  &.hit {
    border-color: red;
  }
  .row {
    width: 100%;
    height: @size;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
  }
  .cell {
    flex-grow: 0;
    flex-shrink: 0;
    display: block;
    width: @size;
    height: @size;
    &.filled {
      background: #DDD;
    }
    &.button {
      position: relative;
      &::after {
        @buttonSize: 80%;
        content: '';
        display: block;
        width: @buttonSize;
        height: @buttonSize;
        border-radius: 100%;
        border: 3px solid blue;
        background: lightblue;
        position: absolute;
        top: 50% - @buttonSize/2;
        left: 50% - @buttonSize/2;
        z-index: 100;
        box-sizing: border-box;
      }
      &::before {
        @holeSize: 3px;
        content: '';
        display: block;
        width: @holeSize;
        height: @holeSize;
        border-radius: @holeSize*2;
        background: blue;
        box-shadow: 0 @holeSize*2 0 blue, @holeSize*2 @holeSize*2 0 blue, @holeSize*2 0 0 blue;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-1.5*@holeSize,-1.5*@holeSize);
        z-index: 150;
        box-sizing: border-box;
      }
    }
  }
}
</style>
