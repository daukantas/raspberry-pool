'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('./index.server');

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});
/* eslint-disable import/export */
//defines: #if SERVER = true
; //defines: #if BROWSER = false
//# sourceMappingURL=index.js.map