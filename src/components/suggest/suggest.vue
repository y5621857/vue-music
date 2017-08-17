<template>
  <scroll class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="_searchMore"
          @beforeScroll="listScroll"
          ref="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" @click="selectItem(item)" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!hasMore && !result.length">
      <no-result title="抱歉,暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import {search} from 'api/search'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import Singer from 'common/js/singer'
  import NoResult from 'base/no-result/no-result'
  import {mapMutations, mapActions} from 'vuex'

  const TYPE_SINGER = 'singer'
  const PERPAGE = 20

  export default {
    data () {
      return {
        page: 1,
        result: [],
        pullup: true,
        hasMore: true,
        beforeScroll: true
      }
    },
    props: {
      query: {
        type: String,
        default: ''
      },
      showSinger: {
        type: Boolean,
        default: true
      }
    },
    components: {
      NoResult,
      Scroll,
      Loading
    },
    methods: {
      selectItem (item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer(item.singerid, item.singermid, item.singername)
          this.$router.push({
            path: '/search/' + singer.id
          })
          this.setSinger(singer)
        } else {
          this.insertSong(item)
        }
        this.$emit('select')
      },
      getIconCls (item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      getDisplayName (item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return item.name + '-' + item.singer
        }
      },
      listScroll () {
        this.$emit('listScroll')
      },
      refresh () {
        this.$refs.suggest.refresh()
      },
      _search () {
        this.hasMore = true
        this.page = 1
        this.$refs.suggest.scrollTo(0, 0)
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data)
            this._cheackMore(res.data)
          }
        })
      },
      _cheackMore (data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * PERPAGE) >= song.totalnum) {
          this.hasMore = false
        }
      },
      _searchMore () {
        if (!this.hasMore) {
          return
        }
        this.page ++
        search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data))
            this._cheackMore(res.data)
          }
        })
      },
      _genResult (data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }

        if (data.song) {
          ret = ret.concat(this._normalizeSong(data.song.list))
        }

        return ret
      },
      _normalizeSong (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query () {
        this._search()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable";
  @import "~common/stylus/mixin";
  @import "~common/stylus/suggest/suggest";
</style>
