'use strict';

var _nightingale = require('nightingale');

var _nightingaleBrowserConsole = require('nightingale-browser-console');

var _nightingaleBrowserConsole2 = _interopRequireDefault(_nightingaleBrowserConsole);

var _nightingaleErrorProcessor = require('nightingale-error-processor');

var _nightingaleErrorProcessor2 = _interopRequireDefault(_nightingaleErrorProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nightingale.addGlobalProcessor)(_nightingaleErrorProcessor2.default);

(0, _nightingale.configure)([{
  // no patterns: default
  handlers: [new _nightingaleBrowserConsole2.default(_nightingale.levels.INFO)]
}, {
  patterns: ['app', 'app.*'],
  handlers: [new _nightingaleBrowserConsole2.default(_nightingale.levels.DEBUG)]
}]);
//# sourceMappingURL=loggers.js.map