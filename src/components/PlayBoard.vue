<template lang="html">
  <div id="playBoard">
    <div v-for="(length, index) in sections" :key="`sec-${index}`" class="section">
      <div v-for="cell in cells.splice(0,length)" :key="cell.index" :class="{tripple: cell.size === 3, button: cell.button}" class="cell">
        {{cell.index}}
        <div v-if="cell.button" class="button" />
      </div>
    </div>
  </div>

</template>

<script>
import _ from 'lodash'
export default {
  name: "PlayBoard",
  computed: {
    sections () {
      return [6, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2]
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
  }
}
</script>

<style lang="less" scoped>
@import '../assets/base.less';
@cells: 8;
@buttonSize: 80%;
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

  &:nth-child(4n+1) .cell {
    &:nth-child(2n) {
      background: #EEEEDD;
    }
    border-top: 1px solid #333;
    &:last-child {
      border-right: 1px solid #333;
    }
    .button {
      top: 50% - @buttonSize/2;
      left: 100% - @buttonSize/2;
    }
  }
  &:nth-child(4n+2) .cell {
    &:nth-child(2n) {
      background: #EEEEDD;
    }
    border-right: 1px solid #333;
    &:last-child {
      border-bottom: 1px solid #333;
    }
    .button {
      top: 100% - @buttonSize/2;
      left: 50% - @buttonSize/2;
    }
  }
  &:nth-child(4n+3) .cell {
    &:nth-child(2n+1) {
      background: #EEEEDD;
    }
    border-bottom: 1px solid #333;
    &:last-child {
      border-left: 1px solid #333;
    }
    .button {
      top: 50% - @buttonSize/2;
      left: -100% + @buttonSize/2;
    }
  }
  &:nth-child(4n+4) .cell {
    &:nth-child(2n) {
      background: #EEEEDD;
    }
    border-left: 1px solid #333;
    &:last-child {
      border-top: 1px solid #333;
    }
    .button {
      top: -100% + @buttonSize/2;
      left: 50% - @buttonSize/2;
    }
  }

  &:nth-child(2n+2) {
    width: @size;
    flex-wrap: wrap;
  }
  &:nth-child(4n+3) {
    flex-direction: row-reverse;
  }
  &:nth-child(4n+4) {
    flex-direction: column-reverse;
  }
  &:nth-child(2) { top: @size; right: 0; }
  &:nth-child(3) { bottom: 0; right: @size; }
  &:nth-child(4) { top: @size; left: 0; }
  &:nth-child(5) { top: @size; left: @size; }
  &:nth-child(6) { top: @size*2; right: @size; }
  &:nth-child(7) { bottom: @size; right: @size*2; }
  &:nth-child(8) { top: @size*2; left: @size; }
  &:nth-child(9) { top: @size*2; left: @size*2; }
  &:nth-child(10) { top: @size*3; right: @size*2; }
  &:nth-child(11) { bottom: @size*2; right: @size*3; }
  &:nth-child(12) { top: @size*3; left: @size*2; }
  &:nth-child(13) { top: @size*3; left: @size*3; }
}
.cell {
  position: relative;
  width: @size;
  height: @size;
  background: #FFFF33;
  box-sizing: border-box;
  &.tripple {
    width: @size*3
  }
  .button {
    display: block;
    width: @buttonSize;
    height: @buttonSize;
    border-radius: 100%;
    border: 3px solid blue;
    background: lightblue;
    position: absolute;
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
</style>
