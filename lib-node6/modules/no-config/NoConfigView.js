'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = NoConfigView;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SimpleLayout = require('../common/layouts/SimpleLayout');

var _SimpleLayout2 = _interopRequireDefault(_SimpleLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line no-use-before-define
NoConfigView.Layout = _SimpleLayout2.default;
function NoConfigView(_ref) {
  let url = _ref.url,
      ip = _ref.ip;

  return _react2.default.createElement(
    'div',
    { className: 'no-config' },
    _react2.default.createElement('div', { className: 'install-picture' }),
    _react2.default.createElement(
      'div',
      { className: 'container-fixed' },
      _react2.default.createElement(
        'h1',
        { className: 'page-title' },
        'Not configured'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Go to ',
        _react2.default.createElement(
          'a',
          { href: url },
          url
        ),
        ' to configure this raspberry'
      ),
      !ip ? '' : _react2.default.createElement(
        'p',
        { className: 'ip' },
        'IP: ',
        ip
      )
    )
  );
}
//# sourceMappingURL=NoConfigView.js.map