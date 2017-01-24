'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alpReactRedux = require('alp-react-redux');

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

var _reactAlpSubscribeContainer = require('react-alp-subscribe-container');

var _reactAlpSubscribeContainer2 = _interopRequireDefault(_reactAlpSubscribeContainer);

var _reactAlpLogin = require('react-alp-login');

var _Header = require('./components/Header');

var _Header2 = _interopRequireDefault(_Header);

var _RaspberryListComponent = require('./components/RaspberryListComponent');

var _RaspberryListComponent2 = _interopRequireDefault(_RaspberryListComponent);

var _UnknownRaspberryListComponent = require('./components/UnknownRaspberryListComponent');

var _UnknownRaspberryListComponent2 = _interopRequireDefault(_UnknownRaspberryListComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _alpReactRedux.connect)(({ context: { state: { user } } }) => ({ user }))(({ user }) => _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    _reactAlpTranslate2.default,
    { id: 'raspberry-pool.title' },
    t => _react2.default.createElement(_alpReactRedux.Helmet, { title: t })
  ),
  _react2.default.createElement(_Header2.default, null),
  !user ? _react2.default.createElement(
    'div',
    { key: 'home-not-connected', className: 'home-not-connected' },
    _react2.default.createElement('div', { className: 'picture' }),
    _react2.default.createElement(
      'main',
      { className: 'main-container' },
      _react2.default.createElement(
        'h1',
        { className: 'page-title' },
        _react2.default.createElement(_reactAlpTranslate2.default, { id: 'home.notConnected.title' })
      ),
      _react2.default.createElement(_reactAlpLogin.LoginButtons, null)
    )
  ) : _react2.default.createElement(
    _reactAlpSubscribeContainer2.default,
    { name: 'raspberries' },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_UnknownRaspberryListComponent2.default, null),
      _react2.default.createElement(_RaspberryListComponent2.default, null)
    )
  )
));
//# sourceMappingURL=IndexView.js.map