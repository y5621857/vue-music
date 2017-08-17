import _extends from 'babel-runtime/helpers/extends';
import { mapGetters } from 'vuex';

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

//# sourceMappingURL=mixin-compiled.js.map