<template lang="html">
  <div id="playBoard">
    <div v-for="(length, index) in sections" :key="`sec-${index}`" :class="[`section-${index}`]" class="section">
      <div v-for="cell in cells.splice(0,length)" :key="cell.index" :class="[`cell-${cell.index}`, {even: cell.index % 2, tripple: cell.size === 3, big: cell.patch, button: cell.button}]" class="cell">
        &nbsp;
        <div v-if="cell.button" class="button" />
        <div v-if="cell.patch && patch(cell.index)" class="patch" />
      </div>
    </div>
  </div>

</template>

<script>
import _ from 'lodash'
export default {
  name: "PlayBoard",
  data () {
    return {
      patches: [20, 26, 32, 44, 50]
    }
  },
  computed: {
    sections () {
      return [5, 7, 7, 5, 5, 4, 5, 4, 3, 3, 3, 1, 1, 1]
    },
    cells () {
      var cells = _.map(_.range(64), i => {
        return {
          index: i,
          size: 1,
          button: false
        }
      })
      cells[0].size = 3
      cells[20].patch = true
      cells[26].patch = true
      cells[32].patch = true
      cells[44].patch = true
      cells[50].patch = true
      cells[4].button = true
      cells[10].button = true
      cells[16].button = true
      cells[22].button = true
      cells[28].button = true
      cells[34].button = true
      cells[40].button = true
      cells[46].button = true
      cells[52].button = true
      return cells
    }
  },
  methods: {
    patch (id) {
      return this.patches.indexOf(id) !== -1
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/base.less';
@size: @playBoardCellSize;
@cells: 8;
@buttonSize: 80%;
@border: 1px solid #222;
#playBoard {
  width: @cells * @size;
  height: @cells * @size;
  background: #FFFFEE;
  position: relative;
  box-sizing: content-box;
}
.section {
  display: flex;
  position: absolute;
  box-sizing: border-box;

  .cell {
    position: relative;
    width: @size;
    height: @size;
    background: #FFFF33;
    box-sizing: border-box;
    &.even {
      background: #EEEEDD;
    }
    &.tripple {
      width: @size*3;
    }
    &.big {
      width: @size*2;
      border-left: @size/2 solid #EEEEDD;
    }

    .patch {
      display: block;
      width: @quiltBoardCellsSize;
      height: @quiltBoardCellsSize;
      background: #985;
      position: absolute;
      top: (@size - @quiltBoardCellsSize)/2;
      left: @size/-2;
      z-index: 100;
      transform: rotate(5deg);
    }
    .button {
      display: block;
      width: @buttonSize;
      height: @buttonSize;
      border-radius: 100%;
      border: 3px solid blue;
      background: lightblue;
      position: absolute;
      top: 50% - @buttonSize/2;
      right: @buttonSize/-2;
      z-index: 100;
      box-sizing: border-box;
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

  &:nth-child(4n+2) {
    transform: rotate(90deg);
  }
  &:nth-child(4n+3) {
    transform: rotate(180deg);
  }
  &:nth-child(4n+4) {
    transform: rotate(270deg);
  }

  border-top: @border;
  border-left: @border;

  &.section-1 {
    top: @size*3;
    right: -3*@size;
  }
  &.section-2 {
    bottom: 0;
    right: 0;
  }
  &.section-3 {
    top: @size*4.5;
    left: @size*-2.5;
  }
  &.section-4 {
    top: @size;
    left: 0;
  }
  &.section-5 {
    top: @size*3;
    right: @size*-1;
  }
  &.section-6 {
    bottom: @size;
    right: @size*1;
  }
  &.section-7 {
    top: @size*4.5;
    left: @size*-.5;
  }
  &.section-8 {
    top: @size*2;
    left: @size*1;
  }
  &.section-9 {
    top: @size*3;
    right: @size*1;
  }
  &.section-10 {
    bottom: @size*2;
    right: @size*2;
    border-right: @border;
  }
  &.section-11 {
    top: @size*4;
    left: @size*2;
    border-left: none;
    border-bottom: @border;
  }
  &.section-12 {
    top: @size*3;
    left: @size*2;
  }
  &.section-13 {
    top: @size*3;
    left: @size*3;
    border: @border;
    border-bottom: none;
    .cell {
      width: @size*2;
      height: @size*2;
    }
  }
}
</style>
