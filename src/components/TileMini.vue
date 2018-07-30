<template>
  <div class="tileMiniContainer">
    <div class="tile">
      <div v-for="(row,i) in tileData.pattern" :key="`r${tileData.id}${i}`" class="row">
        <div v-for="(cell,j) in row" :key="`c${tileData.id}${i}${j}`" :class="{filled: cell, button: cell === 2}" class="cell" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TileMini',
  props: ['tileData']
}
</script>

<style lang="less" scoped>
@import '../assets/base.less';
@size: @miniCellSize;
.tileMiniContainer {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: @size*7;
  height: @size*7;
  vertical-align: middle;
  border-radius: 100%;
  background: darken(lightgreen, 10%);
  margin: 0 10px 0 0;
}
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
      background: blue;
    }
  }
}
</style>
