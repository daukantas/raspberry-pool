'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LoginView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpLogin = require('react-alp-login');

var _HeaderComponent = require('../common/components/install/HeaderComponent');

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

LoginView.contextTypes = {
  setTitle: _react.PropTypes.func.isRequired,
  context: _react.PropTypes.object.isRequired
};

function LoginView(props, _ref) {
  let setTitle = _ref.setTitle;
  let context = _ref.context;

  const title = context.t('title');
  setTitle(`${ title } - Login`);
  return _react2.default.createElement(
    'div',
    { className: 'login-view' },
    _react2.default.createElement(_HeaderComponent2.default, null),
    _react2.default.createElement(_reactAlpLogin.LoginButtons, null)
  );
}
//# sourceMappingURL=LoginView.js.map