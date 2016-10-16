'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'modules/common/components/install/HeaderComponent.jsx';
exports.default = HeaderComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _HeaderUserComponent = require('../HeaderUserComponent');

var _HeaderUserComponent2 = _interopRequireDefault(_HeaderUserComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

HeaderComponent.contextTypes = {
  context: _react.PropTypes.object.isRequired
};

function HeaderComponent(props, _ref) {
  let context = _ref.context;

  return _react2.default.createElement(
    'header',
    { className: 'header row space-between', __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    _react2.default.createElement(
      'div',
      {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      },
      _react2.default.createElement('div', { className: 'logo', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      })
    ),
    _react2.default.createElement(
      'div',
      { className: 'end', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      },
      _react2.default.createElement(
        _reactAlpLink2.default,
        { to: 'home', className: 'button flat', __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          }
        },
        'Your raspberries'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'end', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      },
      _react2.default.createElement(_HeaderUserComponent2.default, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      })
    )
  );
}
//# sourceMappingURL=HeaderComponent.js.map