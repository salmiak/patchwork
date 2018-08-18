<template lang="html">
  <ul :class="{mobile: $root.isMobile}" class="tileList">
    <li v-for="(tile, i) in tileArray" :key="tile.id">
      <div class="tileInfo">
        <i class="fal fa-hourglass-half" /> {{tile.time}} | <i class="fal fa-bullseye" /> {{tile.cost}}
      </div>
      <tile v-if="currentPlayer.buttonsInPocket >= tile.cost && i < 3" :tile-data="tile" @click.native="selectTile(tile)" />
      <tile v-else :tile-data="tile" class="not-selectable" />
    </li>
  </ul>
</template>

<script>
import Tile from './Tile.vue'

export default {
  name: "TileList",
  components: {
    Tile
  },
  computed: {
    currentPlayer () {
      return this.$store.getters['currentPlayer']
    },
    tileArray () {
      return this.$store.getters['tileArray']
    }
  },
  methods: {
    selectTile (tile) {
      this.$store.commit('setCurrentTile', tile)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/base.less';
.tileList {
  display: flex;
  align-items: stretch;
  align-content: stretch;
  overflow-x: auto;
  overflow-y: visible;
  min-height: @quiltBoardCellsSize * 7;
  border-radius: 0 0 6px 6px;
  &.mobile {
    min-height: @mTileCellsSize * 7;
    margin-bottom: 5px;
    border-radius: 0;
    li {
      width: 25%;
    }
  }
  li {
    padding: 10px;
    display: block;
    width: 15%;
    flex-grow: 0;
    flex-shrink: 0;
    background: @cLightSurface;
    &:nth-child(1), &:nth-child(2), &:nth-child(3) {
      background: none;
    }
    &:nth-child(4) {
      border-radius: 12px 0 0 12px;
    }
    .not-selectable {
      opacity: 0.7;
    }
    .tileInfo {
      margin-bottom: 6px;
    }
  }
}
</style>
