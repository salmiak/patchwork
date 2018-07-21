<template lang="html">
  <div class="tileList">
    <tile v-for="tile in tileArray.splice(0,3)" :key="tile.id" :tile-data="tile" @click.native="selectTile(tile)" />
  </div>
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
}
</style>
