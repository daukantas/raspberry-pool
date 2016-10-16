'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'modules/raspberries/components/HeaderComponent.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _ActionsComponent = require('./raspberry/ActionsComponent');

var _ActionsComponent2 = _interopRequireDefault(_ActionsComponent);

var _HeaderUserComponent = require('../../common/components/HeaderUserComponent');

var _HeaderUserComponent2 = _interopRequireDefault(_HeaderUserComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HeaderComponent extends _react.PureComponent {

  render() {
    var _props = this.props;
    const raspberries = _props.raspberries;
    const sendAction = _props.sendAction;


    return _react2.default.createElement(
      'header',
      { className: 'header row space-between', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      },
      _react2.default.createElement(
        'div',
        {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 21
          }
        },
        _react2.default.createElement('div', { className: 'logo', __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          }
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'end', __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 24
          }
        },
        _react2.default.createElement(
          _reactAlpLink2.default,
          { to: 'default', params: { controller: 'install' }, className: 'button flat', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            }
          },
          _react2.default.createElement(_reactAlpTranslate2.default, { id: 'header.installClientLink', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            }
          })
        ),
        _react2.default.createElement(_ActionsComponent2.default, { flat: true, raspberries: raspberries, sendAction: sendAction, __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 28
          }
        })
      ),
      _react2.default.createElement(
        'div',
        { className: 'end', __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 30
          }
        },
        _react2.default.createElement(_HeaderUserComponent2.default, {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 31
          }
        })
      )
    );
  }
}
exports.default = HeaderComponent;
HeaderComponent.propTypes = {
  raspberries: _react.PropTypes.array,
  sendAction: _react.PropTypes.func.isRequired
};
HeaderComponent.contextTypes = {
  context: _react.PropTypes.object.isRequired
};
//# sourceMappingURL=HeaderComponent.js.map