'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'modules/common/components/HeaderUserComponent.jsx';
exports.default = HeaderUserComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

HeaderUserComponent.contextTypes = {
  context: _react.PropTypes.object
};

function HeaderUserComponent(props, _ref) {
  let user = _ref.context.state.user;

  if (user) {
    return _react2.default.createElement(
      'div',
      { className: 'dropdown button flat', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      },
      user.displayName,
      _react2.default.createElement(
        'ul',
        { className: 'list links', __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 14
          }
        },
        _react2.default.createElement(
          'li',
          {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 15
            }
          },
          _react2.default.createElement(
            _reactAlpLink2.default,
            { to: 'logout', target: '_self', __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 15
              }
            },
            _react2.default.createElement(_reactAlpTranslate2.default, { id: 'header.logout', __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 15
              }
            })
          )
        )
      )
    );
  }

  return _react2.default.createElement(
    'div',
    {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      }
    },
    _react2.default.createElement(
      _reactAlpTranslate2.default,
      { id: 'header.login', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      },
      t => _react2.default.createElement(
        _reactAlpLink2.default,
        {
          to: 'login',
          className: 'button flat',
          params: { strategy: 'google' },
          target: '_self',
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          }
        },
        t
      )
    )
  );
}
//# sourceMappingURL=HeaderUserComponent.js.map