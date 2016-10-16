'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alpReactRedux = require('alp-react-redux');

var _raspberries = require('./raspberries');

var _raspberries2 = _interopRequireDefault(_raspberries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _alpReactRedux.combineReducers)({
  raspberries: _raspberries2.default
});
//# sourceMappingURL=index.js.map