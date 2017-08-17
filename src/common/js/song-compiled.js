import _Promise from 'babel-runtime/core-js/promise';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import { getLyric as _getLyric } from 'api/song';
import { ERR_OK } from 'api/config';
import { Base64 } from 'js-base64';

var Song = function () {
  function Song(_ref) {
    var id = _ref.id,
        mid = _ref.mid,
        singer = _ref.singer,
        name = _ref.name,
        album = _ref.album,
        duration = _ref.duration,
        image = _ref.image,
        url = _ref.url;

    _classCallCheck(this, Song);

    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }

  _createClass(Song, [{
    key: 'getLyric',
    value: function getLyric() {
      var _this = this;

      if (this.lyric) {
        return _Promise.resolve(this.lyric);
      }

      return new _Promise(function (resolve, reject) {
        _getLyric(_this.mid).then(function (res) {
          if (res.retcode === ERR_OK) {
            _this.lyric = Base64.decode(res.lyric);
            resolve(_this.lyric);
          } else {
            reject('error');
          }
        });
      });
    }
  }]);

  return Song;
}();

export default Song;


export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + musicData.albummid + '.jpg?max_age=2592000',
    url: 'http://ws.stream.qqmusic.qq.com/' + musicData.songid + '.m4a?fromtag=46'
  });
}

export function createSong2(musicData) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + musicData.album.mid + '.jpg?max_age=2592000',
    url: 'http://ws.stream.qqmusic.qq.com/' + musicData.id + '.m4a?fromtag=46'
  });
}

function filterSinger(singer) {
  var ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach(function (s) {
    ret.push(s.name);
  });
  return ret.join('/');
}

//# sourceMappingURL=song-compiled.js.map