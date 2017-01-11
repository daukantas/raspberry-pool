'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alpReactRedux = require('alp-react-redux');

var _UnknownRaspberryComponent = require('./UnknownRaspberryComponent');

var _UnknownRaspberryComponent2 = _interopRequireDefault(_UnknownRaspberryComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _alpReactRedux.connect)(({ raspberries }) => ({
  raspberries: raspberries.filter(r => !r.registered)
}))(({ raspberries }) => {
  if (!raspberries.length) {
    return null;
  }

  return _react2.default.createElement(
    'ul',
    { className: 'raspberry-list' },
    raspberries.map(raspberry => _react2.default.createElement(
      'li',
      { key: raspberry.id, className: 'raspberry-item' },
      _react2.default.createElement(_UnknownRaspberryComponent2.default, { raspberry: raspberry })
    ))
  );
});
//# sourceMappingURL=UnknownRaspberryListComponent.js.map