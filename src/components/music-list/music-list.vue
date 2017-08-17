<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" v-show="songs.length>0" ref="playBtn" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter" ref="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll @scroll="scroll" :data="songs" class="list" ref="list"
            :probe-type="probeType"
            :listen-scroll="listenScroll">
      <div class="song-list-wrapper">
        <song-list @select="selectItem" :songs="songs" :rank="rank"></song-list>
      </div>
      <div class="loading-container" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import SongList from 'base/song-list/song-list'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {prefixStyle} from 'common/js/dom'
  import {mapActions} from 'vuex'
  import {playListMixin} from 'common/js/mixin'

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle('transform')
  const backDrop = prefixStyle('backdrop-filter')

  export default {
    data () {
      return {
        scrollY: 0
      }
    },
    mixins: [playListMixin],
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted () {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = this.$refs.bgImage.clientHeight + 'px'
    },
    computed: {
      bgStyle () {
        return 'background-image:url(' + this.bgImage + ')'
      }
    },
    components: {
      SongList,
      Scroll,
      Loading
    },
    methods: {
      handlePlayList (playList) {
        const bottom = playList.length > 0 ? '60px' : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      back () {
        this.$router.back()
      },
      selectItem (item, index) {
        this.selectPlay({
          list: this.songs,
          index: index
        })
      },
      random () {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    watch: {
      scrollY (newY) {
        let tranlateY = Math.max(this.minTranslateY, newY)
        let zIndex = 0
        let scale = 1
        let blur = 0

        this.$refs.layer.style[transform] = 'translate3d(0,' + tranlateY + 'px,0)'

        const percent = Math.abs(newY / this.imageHeight)
        if (newY > 0) {
          zIndex = 10
          scale += percent
        } else {
          blur = Math.min(20 * percent, 20)
        }
        this.$refs.filter.style[backDrop] = 'blur(' + blur + 'px)'

        if (newY < this.minTranslateY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = RESERVED_HEIGHT + 'px'
          this.$refs.playBtn.style.display = 'none'
        } else {
          this.$refs.bgImage.style.paddingTop = '70%'
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = ''
        }
        this.$refs.bgImage.style.zIndex = zIndex
        this.$refs.bgImage.style[transform] = 'scale(' + scale + ')'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";
  @import "~common/stylus/mixin";
  @import "~common/stylus/music-list/music-list";
</style>