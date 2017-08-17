import _Object$assign from 'babel-runtime/core-js/object/assign';
import jsonp from 'common/js/jsonp';
import { commonParams, options } from './config';

export function getTopList() {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';

  var data = _Object$assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1
  });

  return jsonp(url, data, options);
}

export function getMusicList(topId) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg';

  var data = _Object$assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    page: 'detail',
    topid: topId,
    type: 'top',
    tpl: 3
  });

  return jsonp(url, data, options);
}

//# sourceMappingURL=rank-compiled.js.map