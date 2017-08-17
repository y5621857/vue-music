<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song,index)" v-for="(song,index) in songs" class="item">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)">{{getRankTxt(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getDesc (song) {
        return song.singer + ' • ' + song.album
      },
      selectItem (song, index) {
        this.$emit('select', song, index)
      },
      getRankCls (index) {
        if (index <= 2) {
          return 'icon icon' + index
        } else {
          return 'text'
        }
      },
      getRankTxt (index) {
        if (index > 2) {
          return index + 1
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";
  @import "~common/stylus/mixin";
  @import "~common/stylus/song-list/song-list";
</style>