'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = ({ active, className }) => _react2.default.createElement(
  'div',
  { className: ['spinner', active && 'active', className].filter(Boolean).join(' ') },
  _react2.default.createElement('div', { className: 'double-bounce1' }),
  _react2.default.createElement('div', { className: 'double-bounce2' })
);
//# sourceMappingURL=SpinnerComponent.js.map