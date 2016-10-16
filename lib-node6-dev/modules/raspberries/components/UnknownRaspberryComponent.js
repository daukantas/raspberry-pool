'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'modules/raspberries/components/UnknownRaspberryComponent.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

var _reactAlpUser = require('react-alp-user');

var _reactAlpUser2 = _interopRequireDefault(_reactAlpUser);

var _SpinnerComponent = require('../../common/components/SpinnerComponent');

var _SpinnerComponent2 = _interopRequireDefault(_SpinnerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnknownRaspberryComponent extends _react.PureComponent {
  constructor() {
    var _temp;

    return _temp = super(...arguments), this.state = {}, _temp;
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
          lineNumber: 20
        }
      },
      _react2.default.createElement(_SpinnerComponent2.default, { active: raspberry.saving, __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }),
      _react2.default.createElement(
        'div',
        {
          __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 22
          }
        },
        _react2.default.createElement(
          'h2',
          { className: 'text-title', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 23
            }
          },
          raspberry.hostname || raspberry.ip
        ),
        _react2.default.createElement(
          'span',
          { className: 'status label', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 24
            }
          },
          raspberry.ip
        ),
        _react2.default.createElement(
          'span',
          {
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 25
            }
          },
          '\xA0'
        ),
        _react2.default.createElement(
          'span',
          { className: 'status label', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 26
            }
          },
          raspberry.online
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'row row-responsive spaced', __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 29
          }
        },
        _react2.default.createElement(
          'div',
          { className: 'col wp-50', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 30
            }
          },
          _react2.default.createElement(
            'div',
            { className: 'text-paragraph-title', __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 31
              }
            },
            _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.title', __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 31
              }
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'input text', __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 32
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
                lineNumber: 33
              }
            }),
            _react2.default.createElement(
              'label',
              { htmlFor: `raspberry-url-${ raspberry.id }`, __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 41
                }
              },
              'Name'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col wp-50', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 44
            }
          },
          _react2.default.createElement(
            'div',
            { className: 'input radio', __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 45
              }
            },
            _react2.default.createElement('input', {
              id: `add-raspberry-${ raspberry.id }`,
              name: 'addOrReplace',
              type: 'radio',
              value: '',
              checked: !this.state.addOrReplace,
              onChange: e => this.setState({ addOrReplace: e.target.value, id: null }),
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 46
              }
            }),
            _react2.default.createElement(
              'label',
              { htmlFor: `add-raspberry-${ raspberry.id }`, __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 54
                }
              },
              _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.add', __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 54
                }
              })
            )
          ),
          !offlineRaspberries.length ? '' : [_react2.default.createElement(
            'div',
            { key: 'addToExisting', className: 'input radio', __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 57
              }
            },
            _react2.default.createElement('input', {
              id: `add-to-existing-raspberry-${ raspberry.id }`,
              name: 'addOrReplace',
              type: 'radio',
              value: 'addToExisting',
              checked: this.state.addOrReplace === 'addToExisting',
              onChange: e => this.setState({ addOrReplace: e.target.value, id: null }),
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 58
              }
            }),
            _react2.default.createElement(
              'label',
              { htmlFor: `add-to-existing-raspberry-${ raspberry.id }`, __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 66
                }
              },
              _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.addToExisting', __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 66
                }
              })
            )
          ), _react2.default.createElement(
            'div',
            { key: 'replace', className: 'input radio', __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 68
              }
            },
            _react2.default.createElement('input', {
              id: `replace-raspberry-${ raspberry.id }`,
              name: 'addOrReplace',
              type: 'radio',
              value: 'replace',
              checked: this.state.addOrReplace === 'replace',
              onChange: e => this.setState({ addOrReplace: e.target.value }),
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 69
              }
            }),
            _react2.default.createElement(
              'label',
              { htmlFor: `replace-raspberry-${ raspberry.id }`, __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 77
                }
              },
              _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.replace', __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 77
                }
              })
            )
          )],
          _react2.default.createElement(
            _reactAlpUser2.default,
            {
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 80
              }
            },
            user => _react2.default.createElement(
              'select',
              {
                disabled: !this.state.addOrReplace,
                name: 'raspberry',
                onChange: e => this.setState({ addOrReplace: this.state.addOrReplace || 'replace', id: e.target.value }),
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 81
                }
              },
              !this.state.id && _react2.default.createElement('option', { key: '__empty', __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 86
                }
              }),
              offlineRaspberries.filter(r => r.data.owner === user.id).map(r => _react2.default.createElement(
                'option',
                { key: r.id, value: r.id, __self: this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 88
                  }
                },
                r.data.name
              ))
            )
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'button-container align-center', __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 95
          }
        },
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            disabled: !!raspberry.saving || !this.state.addOrReplace && !this.state.name || this.state.addOrReplace && !this.state.id,
            onClick: () => {
              registerUnknown(raspberry, {
                name: this.state.name,
                addOrReplace: this.state.addOrReplace,
                id: this.state.id
              });
            },
            __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 96
            }
          },
          _react2.default.createElement(_reactAlpTranslate2.default, { id: 'unknownRaspberry.add', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 110
            }
          })
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