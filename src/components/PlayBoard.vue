<template lang="html">
  <div id="playBoard" :class="{mobile: $root.isMobile}">
    <div v-for="(secCells, index) in sections" :key="`sec-${index}`" :class="[`section-${index}`]" class="section">
      <div v-for="cell in secCells" :key="cell.index" :class="[`cell-${cell.index}`, {even: cell.index % 2, tripple: cell.size === 3, big: cell.big, button: cell.button}]" class="cell">

        <div v-if="cell.button" class="button" />
        <div v-if="cell.patch" class="patch" />
        <div v-if="cell.index === player1pos" :class="{active: $store.getters.currentPlayer.index === 0}" class="player player1" />
        <div v-if="cell.index === player2pos" :class="{active: $store.getters.currentPlayer.index === 1}" class="player player2" />

      </div>
    </div>
  </div>

</template>

<script>
import _ from 'lodash'
export default {
  name: "PlayBoard",
  computed: {
    player1pos () {
      return this.$store.state.players[0].pos
    },
    player2pos () {
      return this.$store.state.players[1].pos
    },
    patches () {
      return this.$store.state.patches
    },
    buttons () {
      return this.$store.state.buttons
    },
    sections () {
      var map = [5, 7, 7, 5, 5, 4, 5, 4, 3, 3, 3, 1, 1, 1]
      var cellSource = _.clone(this.cells)
      return _.map(map, length => {
        return cellSource.splice(0, length)
      })
    },
    cells () {
      var cells = _.map(_.range(64), i => {
        return {
          index: i,
          size: 1,
          patch: (this.patches.indexOf(i) !== -1),
          big: (this.$store.state.patchesPos.indexOf(i) !== -1),
          button: (this.buttons.indexOf(i) !== -1)
        }
      })
      cells[0].size = 3
      return cells
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/base.less';
@size: @playBoardCellSize;
@mSize: 20px;
@cells: 8;
@buttonSize: @playBoardCellSize * 0.8;
@border: 1px solid @cBorder;
@color1: lighten(@cBackground, 25%);
@color2: lighten(@cBackground, 10%);

.section(@size) {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  height: @size;

  .cell {
    position: relative;
    width: @size;
    height: @size;
    background: @color1;
    box-sizing: border-box;
    border-top: @border;
    &:first-child {
      border-left: @border;
    }
    &.even {
      background: @color2;
    }
    &.tripple {
      width: @size*3;
    }
    &.big {
      width: @size*2;
      &::before {
        content: '';
        display: block;
        width: @size / 2;
        top: 0;
        left: 0;
        bottom: 0;
        background: @color2;
        position: absolute;
        z-index: 10;
      }
    }

    .player {
      @playerSize: @size * 0.75;
      position: relative;
      display: inline-block;
      z-index: 400;
      border-radius: @playerSize;
      width: @playerSize;
      height: @playerSize;
      margin: (@size - 1 - @playerSize) * 0.4 @playerSize * -0.2 0 0;
      &.active {
        z-index: 500;
      }
      &:nth-child(2) {
        position: absolute;
        top: (@size - 1 - @playerSize) * 0.4;
        left: @playerSize * -0.2
      }
      &1 {
        background: @cGreen;
        box-shadow: 3px 3px 0 0 darken(@cGreen, 10%);
      }
      &2 {
        background: @cYellow;
        box-shadow: 3px 3px 0 0 darken(@cYellow, 10%);
      }
    }
    .patch {
      display: block;
      width: @quiltBoardCellsSize;
      height: @quiltBoardCellsSize;
      background: lighten(@cGreen, 30%);
      position: absolute;
      top: (@size - 1 - @quiltBoardCellsSize)/2;
      left: 0;
      z-index: 100;
      transform: rotate(3deg);
    }
    .button {
      display: block;
      width: @buttonSize;
      height: @buttonSize;
      border-radius: @buttonSize;
      border: 3px solid @cYellow;
      background: @cYellowBg;
      position: absolute;
      top: (@size - @buttonSize)/2;
      right: @buttonSize/-2;
      z-index: 100;
      box-sizing: border-box;
      &::before {
        @color: @cBackground;
        @holeSize: 2px;
        content: '';
        display: block;
        width: @holeSize;
        height: @holeSize;
        border-radius: @holeSize*2;
        background: @color;
        box-shadow: 0 @holeSize*2 0 @color, @holeSize*2 @holeSize*2 0 @color, @holeSize*2 0 0 @color;
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
    .cell:last-child {
      border-right: @border;
    }
  }
  &.section-11 {
    top: @size*4;
    left: @size*2;
    .cell:first-child {
      border-left: none;
      border-bottom: @border;
    }
  }
  &.section-12 {
    top: @size*3;
    left: @size*2;
  }
  &.section-13 {
    top: @size*3;
    left: @size*3;
    width: @size*2;
    height: @size*2;
    .cell {
      width: @size*2;
      height: @size*2;
      border: @border;
      border-bottom: none;
    }
  }
}

#playBoard {
  width: @cells * @size;
  height: @cells * @size;
  position: relative;
  box-sizing: content-box;
  margin: 20px auto;
  .section {
    .section(@size);
  }
  &.mobile {
    margin: 10px auto;
    width: @cells * @size * 0.5;
    height: @cells * @size * 0.5;
    .section {
      .section(@size * 0.5);
      .cell {
        .patch {
          display: block;
          width: @quiltBoardCellsSize * 0.5;
          height: @quiltBoardCellsSize * 0.5;
          top: (@size * 0.5 - 1 - @quiltBoardCellsSize * 0.5)/2;
        }
        .button {
          @mbSize: @buttonSize * 0.5;
          width: @mbSize;
          height: @mbSize;
          border-radius: @mbSize;
          border: 3px solid @cYellow;
          top: (@size * 0.5 - @mbSize)/2;
          right: @mbSize/-2;
          &::before {
            display: none;
          }
        }
      }
    }
  }
}
</style>
