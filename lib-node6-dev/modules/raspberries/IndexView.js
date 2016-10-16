'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'modules/raspberries/IndexView.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alpReactRedux = require('alp-react-redux');

var _reactAlpUser = require('react-alp-user');

var _reactAlpUser2 = _interopRequireDefault(_reactAlpUser);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

var _reactAlpSubscribeContainer = require('react-alp-subscribe-container');

var _reactAlpSubscribeContainer2 = _interopRequireDefault(_reactAlpSubscribeContainer);

var _reactAlpLogin = require('react-alp-login');

var _HeaderComponent = require('./components/HeaderComponent');

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

var _RaspberryListComponent = require('./components/RaspberryListComponent');

var _RaspberryListComponent2 = _interopRequireDefault(_RaspberryListComponent);

var _UnknownRaspberryListComponent = require('./components/UnknownRaspberryListComponent');

var _UnknownRaspberryListComponent2 = _interopRequireDefault(_UnknownRaspberryListComponent);

var _raspberry = require('./actions/raspberry');

var raspberriesActions = _interopRequireWildcard(_raspberry);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IndexView = (_ref, context) => {
  let unknownRaspberries = _ref.unknownRaspberries;
  let registeredRaspberries = _ref.registeredRaspberries;
  let sendAction = _ref.sendAction;
  let changeConfig = _ref.changeConfig;
  let registerUnknown = _ref.registerUnknown;

  const title = context.context.t('raspberry-pool.title');
  context.setTitle(title);
  return _react2.default.createElement(
    'div',
    {
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      }
    },
    _react2.default.createElement(_HeaderComponent2.default, {
      raspberries: registeredRaspberries,
      sendAction: sendAction,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      }
    }),
    _react2.default.createElement(
      _reactAlpUser2.default,
      {
        __self: undefined,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        }
      },
      user => !user ? _react2.default.createElement(
        'div',
        { key: 'home-not-connected', className: 'home-not-connected', __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 33
          }
        },
        _react2.default.createElement('div', { className: 'picture', __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 34
          }
        }),
        _react2.default.createElement(
          'main',
          { className: 'main-container', __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 35
            }
          },
          _react2.default.createElement(
            'h1',
            { className: 'page-title', __self: undefined,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 36
              }
            },
            _react2.default.createElement(_reactAlpTranslate2.default, { id: 'home.notConnected.title', __self: undefined,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 36
              }
            })
          ),
          _react2.default.createElement(_reactAlpLogin.LoginButtons, {
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 37
            }
          })
        )
      ) : _react2.default.createElement(
        _reactAlpSubscribeContainer2.default,
        { name: 'raspberries', __self: undefined,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 41
          }
        },
        _react2.default.createElement(
          'div',
          {
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 42
            }
          },
          _react2.default.createElement(_UnknownRaspberryListComponent2.default, {
            key: 'unknown',
            raspberries: unknownRaspberries,
            offlineRaspberries: registeredRaspberries.filter(r => !r.online),
            registerUnknown: registerUnknown,
            sendAction: sendAction,
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 43
            }
          }),
          _react2.default.createElement(_RaspberryListComponent2.default, {
            key: 'known',
            raspberries: registeredRaspberries,
            changeConfig: changeConfig,
            sendAction: sendAction,
            __self: undefined,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 50
            }
          })
        )
      )
    )
  );
};

IndexView.propTypes = {
  registeredRaspberries: _react.PropTypes.array.isRequired,
  unknownRaspberries: _react.PropTypes.array.isRequired,

  // actions
  sendAction: _react.PropTypes.func.isRequired,
  changeConfig: _react.PropTypes.func.isRequired,
  registerUnknown: _react.PropTypes.func.isRequired
};

IndexView.contextTypes = {
  setTitle: _react.PropTypes.func.isRequired,
  context: _react.PropTypes.object.isRequired
};

exports.default = (0, _alpReactRedux.connect)((_ref2) => {
  let raspberries = _ref2.raspberries;
  return {
    registeredRaspberries: raspberries.filter(r => r.registered),
    unknownRaspberries: raspberries.filter(r => !r.registered)
  };
}, raspberriesActions)(IndexView);
//# sourceMappingURL=IndexView.js.map