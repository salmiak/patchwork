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
  align-items: flex-start;
  overflow-x: auto;
  overflow-y: visible;
  li {
    display: block;
    width: 30%;
    flex-grow: 0;
    flex-shrink: 0;
    .not-selectable {
      opacity: 0.3;
    }
    .tileInfo {
      margin-bottom: 6px;
    }
  }
}
</style>
