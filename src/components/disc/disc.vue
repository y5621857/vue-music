<template>
  <transition name="slide">
    <music-list :bgImage="bgImage" :title="title" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {ERR_OK} from 'api/config'
  import {createSong2} from 'common/js/song'

  export default {
    computed: {
      ...mapGetters([
        'disc'
      ]),
      title () {
        return this.disc.dissname
      },
      bgImage () {
        return this.disc.imgurl
      }
    },
    data () {
      return {
        songs: []
      }
    },
    created () {
      this._getSongList()
    },
    components: {
      MusicList
    },
    methods: {
      _getSongList () {
        if (!this.disc.dissid) {
          this.$router.push('/recommend')
          return
        }

        getSongList(this.disc.dissid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist)
          }
        })
      },
      _normalizeSongs (list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.id && musicData.album.id) {
            ret.push(createSong2(musicData))
          }
        })
        return ret
      }
    }
  }
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
  @import "~common/stylus/disc/disc";
</style>
