'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

const IndexView = ({
  unknownRaspberries,
  registeredRaspberries,
  sendAction,
  changeConfig,
  registerUnknown
}) => _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    _reactAlpTranslate2.default,
    { id: 'raspberry-pool.title' },
    t => _react2.default.createElement(_alpReactRedux.Helmet, { title: t })
  ),
  _react2.default.createElement(_HeaderComponent2.default, {
    raspberries: registeredRaspberries,
    sendAction: sendAction
  }),
  _react2.default.createElement(
    _reactAlpUser2.default,
    null,
    user => !user ? _react2.default.createElement(
      'div',
      { key: 'home-not-connected', className: 'home-not-connected' },
      _react2.default.createElement('div', { className: 'picture' }),
      _react2.default.createElement(
        'main',
        { className: 'main-container' },
        _react2.default.createElement(
          'h1',
          { className: 'page-title' },
          _react2.default.createElement(_reactAlpTranslate2.default, { id: 'home.notConnected.title' })
        ),
        _react2.default.createElement(_reactAlpLogin.LoginButtons, null)
      )
    ) : _react2.default.createElement(
      _reactAlpSubscribeContainer2.default,
      { name: 'raspberries' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_UnknownRaspberryListComponent2.default, {
          key: 'unknown',
          raspberries: unknownRaspberries,
          offlineRaspberries: registeredRaspberries.filter(r => !r.online),
          registerUnknown: registerUnknown,
          sendAction: sendAction
        }),
        _react2.default.createElement(_RaspberryListComponent2.default, {
          key: 'known',
          raspberries: registeredRaspberries,
          changeConfig: changeConfig,
          sendAction: sendAction
        })
      )
    )
  )
);

exports.default = (0, _alpReactRedux.connect)(({ raspberries }) => ({
  registeredRaspberries: raspberries.filter(r => r.registered),
  unknownRaspberries: raspberries.filter(r => !r.registered)
}), raspberriesActions)(IndexView);
//# sourceMappingURL=IndexView.js.map