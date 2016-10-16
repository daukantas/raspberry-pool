'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HeaderComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _HeaderUserComponent = require('../HeaderUserComponent');

var _HeaderUserComponent2 = _interopRequireDefault(_HeaderUserComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

HeaderComponent.contextTypes = {
  context: _react.PropTypes.object.isRequired
};

function HeaderComponent(props, _ref) {
  let context = _ref.context;

  return _react2.default.createElement(
    'header',
    { className: 'header row space-between' },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', { className: 'logo' })
    ),
    _react2.default.createElement(
      'div',
      { className: 'end' },
      _react2.default.createElement(
        _reactAlpLink2.default,
        { to: 'home', className: 'button flat' },
        'Your raspberries'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'end' },
      _react2.default.createElement(_HeaderUserComponent2.default, null)
    )
  );
}
//# sourceMappingURL=HeaderComponent.js.map