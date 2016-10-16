'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'modules/login/LoginView.jsx';
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
    { className: 'login-view', __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    },
    _react2.default.createElement(_HeaderComponent2.default, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15
      }
    }),
    _react2.default.createElement(_reactAlpLogin.LoginButtons, {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 16
      }
    })
  );
}
//# sourceMappingURL=LoginView.js.map