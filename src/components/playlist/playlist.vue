<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
        </div>
        <scroll class="list-content" :data="playlist" ref="listContent">
          <transition-group name="list" tag="ul">
            <li class="item" v-for="(item,index) in playlist" @click="selectItem(item,index)" :key="item.id" ref="listItem">
              <i class="current" :class="getCurrentIcon(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like">
                <i class="icon-not-favorite"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="add" @click="addSong">
            <i class="icon-add"></i>
            <span class="text">添加歌曲到列队</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <add-song ref="addSong"></add-song>
      <confirm text="是否清空播放列表" confirmBtnText="清空" ref="confirm" @confirm="confirmClear"></confirm>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import Scroll from 'base/scroll/scroll'
  import Confirm from 'base/confirm/confirm'
  import {playMode} from 'common/js/config'
  import {playerMixin} from 'common/js/mixin'
  import AddSong from 'components/add-song/add-song'

  export default {
    mixins: [playerMixin],
    data () {
      return {
        showFlag: false
      }
    },
    components: {
      Scroll,
      Confirm,
      AddSong
    },
    computed: {
      ...mapGetters([

      ]),
      modeText () {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
      }
    },
    methods: {
      show () {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
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
      deleteOne (item) {
        this.deleteSong(item)
        if (!this.playlist.length) {
          this.hide()
        }
      },
      showConfirm () {
        this.$refs.confirm.show()
      },
      confirmClear () {
        this.deleteSongList()
        this.hide()
      },
      addSong () {
        this.$refs.addSong.show()
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
        setPlayState: 'SET_PLAYING_STATE'
      }),
      ...mapActions([
        'deleteSong',
        'deleteSongList'
      ])
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
