import _Promise from 'babel-runtime/core-js/promise';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import jsonp from 'common/js/jsonp';
import { commonParams, options } from './config';
import axios from 'axios';

export function getRecommend() {
  var url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

  var data = _Object$assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });

  return jsonp(url, data, options);
}

export function getDiscList() {
  var url = '/api/getDiscList';

  var data = _Object$assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    loginUid: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  });

  return axios.get(url, {
    params: data
  }).then(function (res) {
    return _Promise.resolve(res.data);
  });
}

export function getSongList(disstid) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';

  var data = _Object$assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    new_format: 1,
    pic: 500,
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    nosign: 1,
    _: 1502676027495
  });

  return jsonp(url, data, {
    param: 'jsonpCallback',
    prefix: 'taogeDataCallback'
  });
}

//# sourceMappingURL=recommend-compiled.js.map