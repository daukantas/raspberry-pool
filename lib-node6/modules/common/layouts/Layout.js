'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _alpReactRedux = require('alp-react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = (_ref) => {
  let { helmet, content } = _ref;

  let props = _objectWithoutProperties(_ref, ['helmet', 'content']);

  // eslint-disable-next-line react/prop-types
  const user = props.initialBrowserContext.state.user;

  return _react2.default.createElement(
    _alpReactRedux.AlpHtml,
    { helmet: helmet },
    _react2.default.createElement(_alpReactRedux.AlpHead, _extends({
      helmet: helmet,
      styleName: user && user.emailDomains.includes('evaneos.com') ? 'evaneos' : 'index'
    }, props)),
    _react2.default.createElement(
      _alpReactRedux.AlpBody,
      null,
      _react2.default.createElement(
        'div',
        { id: 'disconnected' },
        _react2.default.createElement(
          'div',
          null,
          'disconnected'
        )
      ),
      _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: content } })
    )
  );
};
//# sourceMappingURL=Layout.js.map