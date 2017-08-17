<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon"></i>
            <span class="text"></span>
            <span class="clear">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll class="list-content" :data="playlist" ref="listContent">
          <ul>
            <li class="item" v-for="(item,index) in playlist" @click="selectItem(item,index)" ref="listItem">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i class="icon-not-favorite"></i>
              </span>
              <span class="delete">
                <i class="icon-delete"></i>
              </span>
            </li>
          </ul>
        </scroll>
        <div class="list-operate">
          <div class="add">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到列队</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import {playMode} from 'common/js/config'

  export default {
    data () {
      return {
        showFlag: false
      }
    },
    components: {
      Scroll
    },
    computed: {
      ...mapGetters([
        'sequencelist',
        'playlist',
        'currentSong',
        'mode',
        'playing'
      ])
    },
    methods: {
      show () {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
          this._scrollToCurrent(this.currentSong)
        }, 20)
      },
      hide () {
        this.showFlag = false
      },
      getCurrentIcon (item) {
        if (item.id === this.currentSong.id) {
          return 'icon-play'
        }

        return ''
      },
      selectItem (item, index) {
        if (!this.playing) {
          this.setPlayState(true)
        }

        if (this.mode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id === item.id
          })
        }
        this.setCurrentIndex(index)
      },
      _scrollToCurrent (current) {
        const index = this.playlist.findIndex((song) => {
          return song.id === current.id
        })
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 700)
      },
      ...mapMutations({
        setCurrentIndex: 'SET_CURRENT_INDEX',
        setPlayState: 'SET_PLAYING_STATE'
      })
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return
        }
        this._scrollToCurrent(newSong)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable";
  @import "~common/stylus/mixin";
  @import "~common/stylus/playlist/playlist";
</style>
