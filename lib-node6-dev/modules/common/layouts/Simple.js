'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'modules/common/layouts/Simple.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Html extends _react.Component {

    render() {
        return _react2.default.createElement(
            'html',
            {
                __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 20
                }
            },
            _react2.default.createElement(
                'head',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 21
                    }
                },
                _react2.default.createElement('meta', { charSet: 'utf-8', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 22
                    }
                }),
                _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 23
                    }
                }),
                _react2.default.createElement(
                    'title',
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 24
                        }
                    },
                    this.props.title
                ),
                _react2.default.createElement('meta', { name: 'description', content: this.props.description, __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 25
                    }
                }),
                _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 26
                    }
                }),
                _react2.default.createElement('link', { href: 'https://fonts.googleapis.com/css?family=Roboto:400,700,500,300,100,500italic,400italic,700italic', rel: 'stylesheet', type: 'text/css', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 27
                    }
                }),
                _react2.default.createElement('link', { rel: 'stylesheet', href: '/index.css', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 28
                    }
                })
            ),
            _react2.default.createElement(
                'body',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 30
                    }
                },
                this.props.preBody,
                _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: this.props.body }, __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 32
                    }
                }),
                this.props.postBody
            )
        );
    }
}
exports.default = Html;
Html.propTypes = {
    title: _react.PropTypes.string,
    description: _react.PropTypes.string,
    body: _react.PropTypes.string.isRequired,
    preBody: _react.PropTypes.element,
    postBody: _react.PropTypes.element,
    context: _react.PropTypes.object.isRequired
};
Html.defaultProps = {
    title: '',
    description: ''
};
//# sourceMappingURL=Simple.js.map