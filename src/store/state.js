import {playMode} from 'common/js/config'
import {localSearch} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullscreen: false,
  playlist: [],
  sequencelist: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: [],
  topList: {},
  searchHistory: localSearch()
}

export default state
