<template lang="html">
  <ul class="tileList">
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
      this.$emit('tileselected', tile)
    }
  }
}
</script>

<style lang="less">
.tileList {
  display: flex;
  align-items: stretch;
  align-content: stretch;
  overflow-x: auto;
  overflow-y: visible;
  li {
    padding: 10px;
    display: block;
    width: 15%;
    flex-grow: 0;
    flex-shrink: 0;
    background: #CEE;
    &:nth-child(1), &:nth-child(2), &:nth-child(3) {
      background: darken(#CEE, 10%);
    }
    .not-selectable {
      opacity: 0.6;
    }
    .tileInfo {
      margin-bottom: 6px;
    }
  }
}
</style>
