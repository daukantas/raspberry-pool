'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'modules/install/InstallView.jsx';
exports.default = InstallView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _HeaderComponent = require('../common/components/install/HeaderComponent');

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

InstallView.propTypes = {
    url: _react.PropTypes.string.isRequired
};

InstallView.contextTypes = {
    setTitle: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired
};

function InstallView(_ref, _ref2) {
    let url = _ref.url;
    let setTitle = _ref2.setTitle;
    let setMeta = _ref2.setMeta;

    setTitle('How to install raspberry client');
    setMeta('description', 'Install a raspberry to make it work with raspberry-pool');

    return _react2.default.createElement(
        'div',
        {
            __self: this,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 17
            }
        },
        _react2.default.createElement(_HeaderComponent2.default, {
            __self: this,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 18
            }
        }),
        _react2.default.createElement('div', { className: 'install-picture', __self: this,
            __source: {
                fileName: _jsxFileName,
                lineNumber: 19
            }
        }),
        _react2.default.createElement(
            'div',
            { className: 'container-fixed', __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 21
                }
            },
            _react2.default.createElement(
                'h1',
                { className: 'page-title', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 22
                    }
                },
                'How to install raspberry-client on your raspberry ?'
            ),
            _react2.default.createElement(
                'h2',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 24
                    }
                },
                '1. Install raspbian (wheezy or jessie)'
            ),
            _react2.default.createElement(
                'h2',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 26
                    }
                },
                '2. Install your new raspberry'
            ),
            _react2.default.createElement(
                'pre',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 27
                    }
                },
                `curl ${ url }/install-scripts/install-raspberry.sh | sh`
            )
        )
    );
}
//# sourceMappingURL=InstallView.js.map