'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alpReactRedux = require('alp-react-redux');

var _Raspberry = require('./Raspberry');

var _Raspberry2 = _interopRequireDefault(_Raspberry);

var _index = require('../selectors/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _alpReactRedux.connect)(state => ({ raspberries: (0, _index.registeredSelector)(state) }))(({ raspberries }) => _react2.default.createElement(
  'ul',
  { className: 'raspberry-list' },
  raspberries.map(raspberry => _react2.default.createElement(
    'li',
    { key: raspberry.id, className: 'raspberry-item' },
    _react2.default.createElement(_Raspberry2.default, { raspberry: raspberry })
  ))
));
//# sourceMappingURL=RaspberryListComponent.js.map