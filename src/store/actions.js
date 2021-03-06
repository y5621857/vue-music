import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'

export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAYLIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// 添加单首歌曲
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequencelist = state.sequencelist.slice()
  let currentIndex = state.currentIndex

  // 记录当前歌曲
  let currentSong = playlist[currentIndex]

  // 查找当前列表中是否有待插入的歌曲,并返回其索引
  let fpIndex = findIndex(playlist, song)

  // 因为是插入歌曲所以索引需要加一
  currentIndex++

  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)

  // 如果列表已经包含这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequencelist, currentSong) + 1

  let fsIndex = findIndex(sequencelist, song)

  sequencelist.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentSIndex > fsIndex) {
      sequencelist.splice(fsIndex, 1)
    } else {
      sequencelist.splice(fsIndex + 1, 1)
    }
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequencelist)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

//  删除单首歌曲
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequencelist = state.sequencelist.slice()
  let currentIndex = state.currentIndex

  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)

  let sIndex = findIndex(sequencelist, song)
  sequencelist.splice(sIndex, 1)

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequencelist)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

// 清空歌曲列表
export const deleteSongList = function ({commit}) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}
