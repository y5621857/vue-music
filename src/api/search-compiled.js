import _Object$assign from 'babel-runtime/core-js/object/assign';
import jsonp from 'common/js/jsonp';
import { commonParams, options } from './config';

export function getHotKey() {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg';

  var data = _Object$assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    uid: 0,
    _: 1502760406674
  });

  return jsonp(url, data, options);
}

export function search(query, page, zhida, perPage) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';

  var data = _Object$assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage: perPage,
    n: perPage,
    uid: 0,
    remoteplace: 'txt.mqq.all',
    _: 1502762376317
  });

  return jsonp(url, data, options);
}

//# sourceMappingURL=search-compiled.js.map