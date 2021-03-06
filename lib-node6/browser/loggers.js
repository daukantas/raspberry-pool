'use strict';

var _nightingale = require('nightingale');

var _nightingaleBrowserConsole = require('nightingale-browser-console');

var _nightingaleBrowserConsole2 = _interopRequireDefault(_nightingaleBrowserConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import errorProcessor from 'nightingale-error-processor/src';

(0, _nightingale.configure)([
// {
//   processors: [errorProcessor],
// },
false, {
  handlers: [new _nightingaleBrowserConsole2.default(_nightingale.levels.INFO)]
}].filter(Boolean));
//# sourceMappingURL=loggers.js.map