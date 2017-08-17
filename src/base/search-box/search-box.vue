<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" v-model="query" type="text" :placeholder="placeholder" ref="query">
    <i v-show="query" @click="clear" class="icon-dismiss"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import {debounce} from 'common/js/util'

  export default {
    data () {
      return {
        query: ''
      }
    },
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    created () {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 400))
    },
    methods: {
      clear () {
        this.query = ''
      },
      setQuery (query) {
        this.query = query
      },
      blur () {
        this.$refs.query.blur()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable";
  @import "~common/stylus/search-box/search-box";
</style>
