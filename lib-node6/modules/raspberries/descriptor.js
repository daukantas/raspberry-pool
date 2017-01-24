'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducers = exports.View = exports.identifier = undefined;

var _IndexView = require('./IndexView');

var _IndexView2 = _interopRequireDefault(_IndexView);

var _reducers2 = require('./reducers');

var _reducers = _interopRequireWildcard(_reducers2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const identifier = exports.identifier = 'raspberries';
exports.View = _IndexView2.default;
exports.reducers = _reducers;
//# sourceMappingURL=descriptor.js.map