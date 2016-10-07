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

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

HeaderComponent.contextTypes = {
    context: _react.PropTypes.object.isRequired
};

function HeaderComponent(props, _ref) {
    let context = _ref.context;

    return _react2.default.createElement(
        'header',
        { className: 'header', __self: this,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 10
            }
        },
        _react2.default.createElement(
            'div',
            { className: 'left', __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 11
                }
            },
            _react2.default.createElement(_reactAlpTranslate2.default, { id: 'raspberry-pool.title', __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 12
                }
            })
        ),
        _react2.default.createElement(
            'div',
            { className: 'right', __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 14
                }
            },
            _react2.default.createElement(
                _reactAlpLink2.default,
                { to: 'home', className: 'button flat', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 15
                    }
                },
                'Your raspberries'
            )
        )
    );
}
//# sourceMappingURL=HeaderComponent.js.map