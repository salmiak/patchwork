<template>
  <div :class="{mobile: $root.isMobile}" class="tile">
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
      background: lighten(@cBackground, 10%);
    }
    &.button {
      .tileButton;
    }
  }
  &.mobile {
    .row {
      height: @mTileCellsSize;
    }
    .cell {
      width: @mTileCellsSize;
      height: @mTileCellsSize;
      &.button {
        .mobileButton;
      }
    }
  }
}
</style>
