'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

var _HeaderUserComponent = require('../HeaderUserComponent');

var _HeaderUserComponent2 = _interopRequireDefault(_HeaderUserComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => _react2.default.createElement(
  'header',
  { className: 'header row space-between' },
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement('div', { className: 'logo' })
  ),
  _react2.default.createElement(
    'div',
    { className: 'end' },
    _react2.default.createElement(
      _reactAlpLink2.default,
      { to: 'home', className: 'button flat' },
      _react2.default.createElement(_reactAlpTranslate2.default, { id: 'header.raspberriesLink' })
    )
  ),
  _react2.default.createElement(
    'div',
    { className: 'end' },
    _react2.default.createElement(_HeaderUserComponent2.default, null)
  )
);
//# sourceMappingURL=HeaderComponent.js.map