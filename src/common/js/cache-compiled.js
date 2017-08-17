import storage from 'good-storage';

var SEARCH_KEY = '__search__';
var SEARCH_MAX_LENGTH = 15;

export function saveSearch(query) {
  var searches = storage.get(SEARCH_KEY, []);
  insertAarry(searches, query, function (item) {
    return item === query;
  }, SEARCH_MAX_LENGTH);

  storage.set(SEARCH_KEY, searches);

  return searches;
}

export function deleteSearch(query) {
  var searches = storage.get(SEARCH_KEY, []);
  deleteFromArray(searches, function (item) {
    return item === query;
  });

  storage.set(SEARCH_KEY, searches);

  return searches;
}

export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return [];
}

function insertAarry(arr, val, compare, maxLen) {
  var index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }

  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);

  if (maxLen && arr.length > maxLen) {
    arr.pop();
  }
}

function deleteFromArray(arr, compare) {
  var index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function localSearch() {
  return storage.get(SEARCH_KEY, []);
}

//# sourceMappingURL=cache-compiled.js.map