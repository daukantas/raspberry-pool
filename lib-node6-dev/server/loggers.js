'use strict';

var _nightingale = require('nightingale');

var _nightingaleConsole = require('nightingale-console');

var _nightingaleConsole2 = _interopRequireDefault(_nightingaleConsole);

var _nightingaleErrorProcessor = require('nightingale-error-processor');

var _nightingaleErrorProcessor2 = _interopRequireDefault(_nightingaleErrorProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _nightingale.configure)([{
  processors: [_nightingaleErrorProcessor2.default]
}, {
  pattern: /^app/,
  handlers: [new _nightingaleConsole2.default(_nightingale.levels.DEBUG)],
  stop: true
}, {
  handlers: [new _nightingaleConsole2.default(_nightingale.levels.INFO)]
}]);
//# sourceMappingURL=loggers.js.map