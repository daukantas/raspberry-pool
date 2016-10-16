'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'modules/common/components/SpinnerComponent.jsx';
exports.default = SpinnerComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

SpinnerComponent.propTypes = {
  active: _react.PropTypes.bool
};

function SpinnerComponent(_ref) {
  let active = _ref.active;

  return _react2.default.createElement(
    'div',
    { className: `spinner${ active ? ' active' : '' }`, __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8
      }
    },
    _react2.default.createElement('div', { className: 'double-bounce1', __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9
      }
    }),
    _react2.default.createElement('div', { className: 'double-bounce2', __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    })
  );
}
//# sourceMappingURL=SpinnerComponent.js.map