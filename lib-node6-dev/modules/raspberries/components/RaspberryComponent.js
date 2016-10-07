'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'modules/raspberries/components/RaspberryComponent.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _SpinnerComponent = require('../../common/components/SpinnerComponent');

var _SpinnerComponent2 = _interopRequireDefault(_SpinnerComponent);

var _ActionsComponent = require('./raspberry/ActionsComponent');

var _ActionsComponent2 = _interopRequireDefault(_ActionsComponent);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RaspberryComponent extends _react.Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = _function2.default;
        this.state = {};
    }

    render() {
        var _props = this.props;
        const raspberry = _props.raspberry;
        const changeConfig = _props.changeConfig;
        const sendAction = _props.sendAction;


        let url;
        let display;
        if (this.state.url != null) {
            url = this.state.url;
        } else if (raspberry.saving) {
            url = this.state.lastUrl;
        } else {
            url = raspberry.data.config.url;
        }

        if (this.state.display != null) {
            display = this.state.display;
        } else if (raspberry.saving) {
            display = this.state.lastDisplay;
        } else {
            display = raspberry.data.config.display;
        }

        return _react2.default.createElement(
            'div',
            { className: 'raspberry', __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 42
                }
            },
            _react2.default.createElement(
                'div',
                { className: 'img-container', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 43
                    }
                },
                _react2.default.createElement('img', { alt: 'screenshot', src: `/screenshot.jpg?id=${ raspberry.id }&date=${ Date.now() }`, __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 44
                    }
                })
            ),
            _react2.default.createElement(
                'div',
                { className: 'header-container', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 46
                    }
                },
                _react2.default.createElement(
                    'h2',
                    { className: 'text-title', __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 47
                        }
                    },
                    _react2.default.createElement(
                        'span',
                        { className: `screen-status ${ raspberry.online ? raspberry.screenState : 'offline' }`, title: raspberry.screenState === 'on' ? 'On' : 'Off', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 48
                            }
                        },
                        _react2.default.createElement('span', { className: 'icon', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 49
                            }
                        }),
                        _react2.default.createElement('span', { className: 'status', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 50
                            }
                        })
                    ),
                    raspberry.data.name
                )
            ),
            _react2.default.createElement(_SpinnerComponent2.default, { active: raspberry.saving, __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 55
                }
            }),
            _react2.default.createElement(
                'div',
                { className: 'status-container', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 57
                    }
                },
                _react2.default.createElement(
                    'span',
                    { className: `raspberry-status label ${ raspberry.online ? 'success' : 'warning' }`, __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 58
                        }
                    },
                    raspberry.online ? `${ raspberry.ip }` : _react2.default.createElement(_reactAlpTranslate2.default, { id: 'raspberry.offline', __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 59
                        }
                    })
                )
            ),
            _react2.default.createElement(_ActionsComponent2.default, { raspberries: [raspberry], sendAction: sendAction, __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 63
                }
            }),
            _react2.default.createElement(
                'fieldset',
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 65
                    }
                },
                _react2.default.createElement(
                    'legend',
                    {
                        __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 66
                        }
                    },
                    _react2.default.createElement(_reactAlpTranslate2.default, { id: 'raspberry.config', __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 66
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'row row-responsive spaced', __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 67
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'col', style: { width: '100px', 'flex-basis': '100px', 'flex-grow': 0 }, __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 68
                            }
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'input select', __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 69
                                }
                            },
                            _react2.default.createElement(
                                'select',
                                {
                                    value: display || 'kweb3',
                                    id: `raspberry-select-${ raspberry.id }`,
                                    className: 'has-value',
                                    onChange: e => this.setState({
                                        display: raspberry.data.config.display === e.target.value ? null : e.target.value
                                    }),
                                    __self: this,
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 70
                                    }
                                },
                                _react2.default.createElement(
                                    'option',
                                    { value: 'kweb3', __self: this,
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 78
                                        }
                                    },
                                    'kweb3'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: 'chromium', __self: this,
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 79
                                        }
                                    },
                                    'chromium'
                                ),
                                _react2.default.createElement(
                                    'option',
                                    { value: 'livestreamer', __self: this,
                                        __source: {
                                            fileName: _jsxFileName,
                                            lineNumber: 80
                                        }
                                    },
                                    'livestreamer'
                                )
                            ),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: `raspberry-select-${ raspberry.id }`, __self: this,
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 82
                                    }
                                },
                                _react2.default.createElement(_reactAlpTranslate2.default, { id: 'raspberry.display', __self: this,
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 82
                                    }
                                })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'col', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 85
                            }
                        },
                        _react2.default.createElement(
                            'div',
                            { className: 'input text', __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 86
                                }
                            },
                            _react2.default.createElement('input', {
                                id: `raspberry-url-${ raspberry.id }`,
                                type: 'url', required: true,
                                className: `has-value${ url ? '' : ' has-empty-value' }`,
                                value: url,
                                autoComplete: 'off',
                                onChange: e => this.setState({
                                    url: raspberry.data.config.url === e.target.value ? null : e.target.value
                                }),
                                __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 87
                                }
                            }),
                            _react2.default.createElement(
                                'label',
                                { htmlFor: `raspberry-url-${ raspberry.id }`, __self: this,
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 97
                                    }
                                },
                                _react2.default.createElement(_reactAlpTranslate2.default, { id: 'raspberry.url', __self: this,
                                    __source: {
                                        fileName: _jsxFileName,
                                        lineNumber: 97
                                    }
                                })
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'button-container center', __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 102
                        }
                    },
                    _react2.default.createElement(
                        'button',
                        {
                            type: 'button',
                            disabled: raspberry.saving || this.state.url == null && this.state.display == null,
                            onClick: () => {
                                const display = this.state.display || raspberry.data.config.display;
                                const url = this.state.url || raspberry.data.config.url;
                                this.setState({ url: null, lastUrl: url, display: null, lastDisplay: display });
                                changeConfig(raspberry, { display, url });
                            },
                            __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 103
                            }
                        },
                        _react2.default.createElement(_reactAlpTranslate2.default, { id: 'raspberry.save', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 113
                            }
                        })
                    )
                )
            )
        );
    }
}
exports.default = RaspberryComponent;
RaspberryComponent.propTypes = {
    raspberry: _react.PropTypes.object.isRequired,
    changeConfig: _react.PropTypes.func.isRequired,
    sendAction: _react.PropTypes.func.isRequired
};
//# sourceMappingURL=RaspberryComponent.js.map