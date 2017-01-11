'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpUser = require('react-alp-user');

var _reactAlpUser2 = _interopRequireDefault(_reactAlpUser);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => _react2.default.createElement(
  _reactAlpUser2.default,
  null,
  user => user ? _react2.default.createElement(
    'div',
    { className: 'dropdown button flat' },
    user.displayName,
    _react2.default.createElement(
      'ul',
      { className: 'list links' },
      _react2.default.createElement(
        'li',
        null,
        _react2.default.createElement(
          _reactAlpLink2.default,
          { to: 'logout', target: '_self' },
          _react2.default.createElement(_reactAlpTranslate2.default, { id: 'header.logout' })
        )
      )
    )
  ) : _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _reactAlpTranslate2.default,
      { id: 'header.login' },
      t => _react2.default.createElement(
        _reactAlpLink2.default,
        {
          to: 'login',
          className: 'button flat',
          params: { strategy: 'google' },
          target: '_self'
        },
        t
      )
    )
  )
);
//# sourceMappingURL=HeaderUserComponent.js.map