'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'modules/raspberries/components/UnknownRaspberryComponent.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _SpinnerComponent = require('../../common/components/SpinnerComponent');

var _SpinnerComponent2 = _interopRequireDefault(_SpinnerComponent);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnknownRaspberryComponent extends _react.Component {

    constructor(props) {
        super(props);
        this.shouldComponentUpdate = _function2.default;
        this.state = {};
    }

    render() {
        var _props = this.props;
        const raspberry = _props.raspberry;
        const registerUnknown = _props.registerUnknown;
        const offlineRaspberries = _props.offlineRaspberries;


        return _react2.default.createElement(
            'div',
            { className: 'raspberry unknown', __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 24
                }
            },
            _react2.default.createElement(
                'h2',
                { className: 'text-title', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 25
                    }
                },
                raspberry.online
            ),
            _react2.default.createElement(_SpinnerComponent2.default, { active: raspberry.saving, __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                }
            }),
            _react2.default.createElement(
                'span',
                { className: 'status label', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 27
                    }
                },
                raspberry.ip
            ),
            _react2.default.createElement(
                'div',
                { className: 'row row-responsive spaced', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 30
                    }
                },
                _react2.default.createElement(
                    'div',
                    { className: 'col wp-50', __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 31
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'text-paragraph-title', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 32
                            }
                        },
                        _react2.default.createElement(_reactAlpTranslate2.default, { key: 'unknownRaspberry.title', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 32
                            }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'input text', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 33
                            }
                        },
                        _react2.default.createElement('input', {
                            type: 'text',
                            required: true,
                            autoComplete: 'off',
                            className: `${ this.state.name === undefined ? '' : `has-value${ this.state.name ? '' : ' has-empty-value' }` }`,
                            value: this.state.name,
                            onChange: e => this.setState({ name: e.target.value }),
                            __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 34
                            }
                        }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: `raspberry-url-${ raspberry.id }`, __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 42
                                }
                            },
                            'Name'
                        )
                    )
                ),
                !offlineRaspberries.length ? '' : _react2.default.createElement(
                    'div',
                    { className: 'col wp-50', __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 46
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'text-paragraph-title', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 47
                            }
                        },
                        _react2.default.createElement(_reactAlpTranslate2.default, { key: 'unknownRaspberry.addToExisting', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 47
                            }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'input radio', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 48
                            }
                        },
                        _react2.default.createElement('input', {
                            id: `add-raspberry-${ raspberry.id }`,
                            name: 'addOrReplace',
                            type: 'radio',
                            defaultChecked: true,
                            value: 'add',
                            onChange: e => this.setState({ addOrReplace: e.target.value }),
                            __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 49
                            }
                        }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: `add-raspberry-${ raspberry.id }`, __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 57
                                }
                            },
                            _react2.default.createElement(_reactAlpTranslate2.default, { key: 'unknownRaspberry.add', __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 57
                                }
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'input radio', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 59
                            }
                        },
                        _react2.default.createElement('input', {
                            id: `replace-raspberry-${ raspberry.id }`,
                            name: 'addOrReplace',
                            type: 'radio',
                            value: 'replace',
                            onChange: e => this.setState({ addOrReplace: e.target.value }),
                            __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 60
                            }
                        }),
                        _react2.default.createElement(
                            'label',
                            { htmlFor: `replace-raspberry-${ raspberry.id }`, __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 67
                                }
                            },
                            _react2.default.createElement(_reactAlpTranslate2.default, { key: 'unknownRaspberry.replace', __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 67
                                }
                            })
                        )
                    ),
                    _react2.default.createElement(
                        'select',
                        { name: 'raspberry', onChange: e => this.setState({ id: e.target.value }), __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 69
                            }
                        },
                        !this.state.id && _react2.default.createElement('option', { key: '__empty', __self: this,
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 70
                            }
                        }),
                        offlineRaspberries.map(r => _react2.default.createElement(
                            'option',
                            { key: r.id, value: r.id, __self: this,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 71
                                }
                            },
                            r.data.name
                        ))
                    )
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'button-container center', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 77
                    }
                },
                _react2.default.createElement(
                    'button',
                    {
                        type: 'button',
                        disabled: !(this.state.name || this.state.id) || !!raspberry.saving,
                        onClick: () => {
                            registerUnknown(raspberry, {
                                name: this.state.name,
                                id: this.state.id,
                                addOrReplace: this.state.addOrReplace || this.state.id && 'add'
                            });
                        },
                        __self: this,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 78
                        }
                    },
                    'Add'
                )
            )
        );
        /*
                <button type="button" onClick={() => {
                    sendAction(raspberry, 'blink');
                    this.setState({ urlChanged: false });
                }}>Blink</button>
        */
    }
}
exports.default = UnknownRaspberryComponent;
UnknownRaspberryComponent.propTypes = {
    raspberry: _react.PropTypes.object.isRequired,
    offlineRaspberries: _react.PropTypes.array.isRequired,
    registerUnknown: _react.PropTypes.func.isRequired,
    sendAction: _react.PropTypes.func.isRequired
};
//# sourceMappingURL=UnknownRaspberryComponent.js.map