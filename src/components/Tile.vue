<template>
  <div class="tile">
    <div v-for="(row,i) in tileData.pattern" :key="`r${tileData.id}${i}`" class="row">
      <div v-for="(cell,j) in row" :key="`c${tileData.id}${i}${j}`" :class="{filled: cell}" class="cell" />
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
.tile {
  position: relative;
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
    display: block;
    width: @size;
    height: @size;
    &.filled {
      background: #CCC;
    }
  }
}
</style>
