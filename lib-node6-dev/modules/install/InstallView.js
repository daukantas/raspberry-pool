'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _jsxFileName = 'modules/install/InstallView.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpUser = require('react-alp-user');

var _reactAlpUser2 = _interopRequireDefault(_reactAlpUser);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _HeaderComponent = require('../common/components/install/HeaderComponent');

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InstallView(_ref, _ref2) {
  let hostname = _ref.hostname;
  let websocketPort = _ref.websocketPort;
  let setTitle = _ref2.setTitle;
  let setMeta = _ref2.setMeta;

  setTitle('How to install raspberry client');
  setMeta('description', 'Install a raspberry to make it work with raspberry-pool');

  return _react2.default.createElement(
    _reactAlpUser2.default,
    {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    },
    user => _react2.default.createElement(
      'div',
      {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      },
      _react2.default.createElement(_HeaderComponent2.default, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 13
        }
      }),
      _react2.default.createElement('div', { className: 'install-picture', __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }),
      _react2.default.createElement(
        'div',
        { className: 'container-fixed', __self: this,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 16
          }
        },
        _react2.default.createElement(
          'h1',
          { className: 'page-title', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 17
            }
          },
          'How to install raspberry-client on your raspberry ?'
        ),
        _react2.default.createElement(
          'ol',
          { className: 'list block', __self: this,
            __source: {
              fileName: _jsxFileName,
              lineNumber: 19
            }
          },
          _react2.default.createElement(
            'li',
            {
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 20
              }
            },
            '1. Install raspbian (wheezy or jessie)'
          ),
          _react2.default.createElement(
            'li',
            {
              __self: this,
              __source: {
                fileName: _jsxFileName,
                lineNumber: 21
              }
            },
            '2. Install the client',
            _react2.default.createElement(
              'div',
              {
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 24
                }
              },
              'All-in-one install:'
            ),
            _react2.default.createElement(
              'pre',
              {
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 25
                }
              },
              'USER_ID=',
              user ? `'${ user.id }'` : _react2.default.createElement(
                _reactAlpLink2.default,
                { to: 'login', __self: this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 26
                  }
                },
                'Please login !'
              ),
              ` curl ${ hostname }/install-scripts/install-raspberry.sh | sh`
            ),
            _react2.default.createElement(
              'div',
              {
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 30
                }
              },
              'Or install node and the client manually:'
            ),
            _react2.default.createElement(
              'pre',
              {
                __self: this,
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 31
                }
              },
              'curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -',
              '\n',
              'sudo apt-get install -y nodejs scrot',
              '\n',
              'sudo npm install -g raspberry-client',
              '\n',
              'sudo rpi-cli install --userId=',
              user ? `'${ user.id }'` : _react2.default.createElement(
                _reactAlpLink2.default,
                { to: 'login', __self: this,
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 35
                  }
                },
                'Please login !'
              ),
              ' --host=',
              `'${ hostname }'`,
              ' --port=',
              websocketPort
            )
          )
        )
      )
    )
  );
}

InstallView.propTypes = {
  hostname: _react.PropTypes.string.isRequired,
  websocketPort: _react.PropTypes.number.isRequired
};

InstallView.contextTypes = {
  setTitle: _react.PropTypes.func.isRequired,
  setMeta: _react.PropTypes.func.isRequired
};

exports.default = InstallView;
//# sourceMappingURL=InstallView.js.map