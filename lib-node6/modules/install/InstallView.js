'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alpReactRedux = require('alp-react-redux');

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _HeaderComponent = require('../common/components/install/HeaderComponent');

var _HeaderComponent2 = _interopRequireDefault(_HeaderComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _alpReactRedux.connect)(({ context: { state: { user } } }) => ({ user }))(({ user, hostname, websocketPort }) => _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(_alpReactRedux.Helmet, {
    title: 'How to install raspberry client',
    meta: [{
      name: 'description',
      content: 'Install a raspberry to make it work with raspberry-pool'
    }]
  }),
  _react2.default.createElement(_HeaderComponent2.default, null),
  _react2.default.createElement('div', { className: 'install-picture' }),
  _react2.default.createElement(
    'div',
    { className: 'container-fixed' },
    _react2.default.createElement(
      'h1',
      { className: 'page-title' },
      'How to install raspberry-client on your raspberry ?'
    ),
    _react2.default.createElement(
      'ol',
      { className: 'list block' },
      _react2.default.createElement(
        'li',
        null,
        '1. Install raspbian (wheezy or jessie)'
      ),
      _react2.default.createElement(
        'li',
        null,
        '2. Install the client',
        _react2.default.createElement(
          'div',
          null,
          'All-in-one install:'
        ),
        _react2.default.createElement(
          'pre',
          null,
          `curl ${ hostname }/install-scripts/install-raspberry.sh | `,
          'USER_ID=',
          user ? `'${ user.id }'` : _react2.default.createElement(
            _reactAlpLink2.default,
            { to: 'login' },
            'Please login !'
          ),
          ' sh'
        ),
        _react2.default.createElement(
          'div',
          null,
          'Or install node and the client manually:'
        ),
        _react2.default.createElement(
          'pre',
          null,
          'curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -',
          '\n',
          'sudo apt-get install -y nodejs git',
          '\n',
          'sudo npm install -g raspberry-client',
          '\n',
          'sudo rpi-cli install --userId=',
          user ? `'${ user.id }'` : _react2.default.createElement(
            _reactAlpLink2.default,
            { to: 'login' },
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
));
//# sourceMappingURL=InstallView.js.map