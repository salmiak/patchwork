<template lang="html">
  <ul class="tileList">
    <li v-for="tile in tileArray.splice(0,3)" :key="tile.id">
      <div class="tileInfo">
        <i class="fal fa-hourglass-half" /> {{tile.time}} | <i class="fal fa-bullseye" /> {{tile.cost}}
      </div>
      <tile :tile-data="tile" @click.native="selectTile(tile)" />
    </li>
    <li v-for="tile in tileArray" :key="tile.id">
      <div class="tileInfo">
        <i class="fal fa-hourglass-half" /> {{tile.time}} | <i class="fal fa-bullseye" /> {{tile.cost}}
      </div>
      <tile :tile-data="tile" class="not-selectable" />
    </li>
  </ul>
</template>

<script>
import _ from 'lodash'
import Tile from './Tile.vue'
import tiles from '../assets/tiles.json'

export default {
  name: "TileList",
  components: {
    Tile
  },
  props: ['tileIdArray'],
  computed: {
    tileArray () {
      return _.map(this.tileIdArray, i => { return tiles[i] })
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
