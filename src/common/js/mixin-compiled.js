import _extends from 'babel-runtime/helpers/extends';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { playMode } from 'common/js/config';
import { shuffle } from 'common/js/util';

export var playListMixin = {
  computed: _extends({}, mapGetters(['playlist'])),
  mounted: function mounted() {
    this.handlePlayList(this.playlist);
  },
  activated: function activated() {
    this.handlePlayList(this.playlist);
  },

  watch: {
    playlist: function playlist(newVal) {
      this.handlePlayList(newVal);
    }
  },
  methods: {
    handlePlayList: function handlePlayList() {
      throw new Error('component must implement handlePlayList method');
    }
  }
};

export var playerMixin = {
  computed: _extends({
    iconMode: function iconMode() {
      switch (this.mode) {
        case playMode.sequence:
          return 'icon-sequence';
        case playMode.loop:
          return 'icon-loop';
        case playMode.random:
          return 'icon-random';
      }
    }
  }, mapGetters(['sequencelist', 'playlist', 'currentSong', 'mode', 'playing'])),
  methods: _extends({
    changeMode: function changeMode() {
      var mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      var list = null;
      if (mode === playMode.random) {
        list = shuffle(this.sequencelist);
      } else {
        list = this.sequencelist;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
      this._scrollToCurrent(this.currentSong);
    },
    resetCurrentIndex: function resetCurrentIndex(list) {
      var _this = this;

      var index = list.findIndex(function (item) {
        return item.id === _this.currentSong.id;
      });
      this.setCurrentIndex(index);
    }
  }, mapMutations({
    setPlayingState: 'SET_PLAYING_STATE',
    setCurrentIndex: 'SET_CURRENT_INDEX',
    setPlayMode: 'SET_PLAY_MODE',
    setPlayList: 'SET_PLAYLIST'
  }))
};

export var searchMixin = {
  data: function data() {
    return {
      query: ''
    };
  },

  computed: _extends({}, mapGetters(['searchHistory'])),
  methods: _extends({
    addQuery: function addQuery(query) {
      this.$refs.searchBox.setQuery(query);
    },
    blurInput: function blurInput() {
      this.$refs.searchBox.blur();
    },
    saveSearch: function saveSearch() {
      this.saveSearchHistory(this.query);
    },
    onQueryChange: function onQueryChange(query) {
      this.query = query;
    }
  }, mapActions(['saveSearchHistory', 'deleteSearchHistory']))
};

//# sourceMappingURL=mixin-compiled.js.map