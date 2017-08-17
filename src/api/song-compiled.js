import _Promise from 'babel-runtime/core-js/promise';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import { commonParams } from './config';
import axios from 'axios';

export function getLyric(mid) {
  var url = '/api/tyric';

  var data = _Object$assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    needNewCode: 0,
    loginUin: 0,
    hostUin: 0,
    format: 'json'
  });

  return axios.get(url, {
    params: data
  }).then(function (res) {
    return _Promise.resolve(res.data);
  });
}

//# sourceMappingURL=song-compiled.js.map