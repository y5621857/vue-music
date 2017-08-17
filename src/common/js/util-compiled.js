function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(arr) {
  var _arr = arr.slice();
  for (var i = 0; i < _arr.length; i++) {
    var j = getRandomInt(0, i);
    var t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}

export function debounce(func, delay) {
  var timer = void 0;

  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      func.apply(_this, args);
    }, delay);
  };
}

//# sourceMappingURL=util-compiled.js.map