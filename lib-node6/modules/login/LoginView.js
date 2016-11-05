'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoginView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alpReactRedux = require('alp-react-redux');

var _reactAlpLogin = require('react-alp-login');

var _HeaderComponent = require('../common/components/install/HeaderComponent');

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LoginView() {
  return _react2.default.createElement(
    'div',
    { className: 'login-view' },
    _react2.default.createElement(_alpReactRedux.Helmet, { title: 'Login' }),
    _react2.default.createElement(_HeaderComponent2.default, null),
    _react2.default.createElement(_reactAlpLogin.LoginButtons, null)
  );
}
//# sourceMappingURL=LoginView.js.map