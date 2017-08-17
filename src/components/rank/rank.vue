<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="topList">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" alt="排行榜" v-lazy="item.picUrl">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getTopList} from 'api/rank'
  import {ERR_OK} from 'api/config'
  import {playListMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    data () {
      return {
        topList: []
      }
    },
    created () {
      this._getTopList()
    },
    mixins: [playListMixin],
    components: {
      Scroll,
      Loading
    },
    methods: {
      selectItem (item) {
        this.$router.push({
          path: '/rank/' + item.id
        })
        this.setTopList(item)
      },
      handlePlayList (playList) {
        const bottom = playList.length ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.topList.refresh()
      },
      _getTopList () {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList
          }
        })
      },
      ...mapMutations({
        setTopList: 'SET_TOPLIST'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";
  @import "~common/stylus/mixin";
  @import "~common/stylus/rank/rank";
</style>
