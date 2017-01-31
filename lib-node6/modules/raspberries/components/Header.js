'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alpReactRedux = require('alp-react-redux');

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _Actions = require('./raspberry/Actions');

var _Actions2 = _interopRequireDefault(_Actions);

var _HeaderUserComponent = require('../../common/components/HeaderUserComponent');

var _HeaderUserComponent2 = _interopRequireDefault(_HeaderUserComponent);

var _Header = require('./Header.styl');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _alpReactRedux.connect)(({ raspberries }) => ({ onlineRaspberries: raspberries.filter(r => r.registered && r.online) }))(({ onlineRaspberries }) => _react2.default.createElement(
  'header',
  { className: `header ${_Header2.default.header}` },
  _react2.default.createElement(
    'div',
    { className: _Header2.default.logoContainer },
    _react2.default.createElement('div', { className: _Header2.default.logo })
  ),
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _reactAlpLink2.default,
      { to: 'default', params: { controller: 'install' }, className: 'button flat' },
      _react2.default.createElement(_reactAlpTranslate2.default, { id: 'header.installClientLink' })
    ),
    _react2.default.createElement(_Actions2.default, { flat: true, raspberries: onlineRaspberries })
  ),
  _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_HeaderUserComponent2.default, null)
  )
));
//# sourceMappingURL=Header.js.map