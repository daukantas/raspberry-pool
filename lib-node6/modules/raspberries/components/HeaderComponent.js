'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAlpTranslate = require('react-alp-translate');

var _reactAlpTranslate2 = _interopRequireDefault(_reactAlpTranslate);

var _reactAlpLink = require('react-alp-link');

var _reactAlpLink2 = _interopRequireDefault(_reactAlpLink);

var _ActionsComponent = require('./raspberry/ActionsComponent');

var _ActionsComponent2 = _interopRequireDefault(_ActionsComponent);

var _HeaderUserComponent = require('../../common/components/HeaderUserComponent');

var _HeaderUserComponent2 = _interopRequireDefault(_HeaderUserComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HeaderComponent = (_ref) => {
  let raspberries = _ref.raspberries;
  let sendAction = _ref.sendAction;
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
        { to: 'default', params: { controller: 'install' }, className: 'button flat' },
        _react2.default.createElement(_reactAlpTranslate2.default, { id: 'header.installClientLink' })
      ),
      _react2.default.createElement(_ActionsComponent2.default, { flat: true, raspberries: raspberries, sendAction: sendAction })
    ),
    _react2.default.createElement(
      'div',
      { className: 'end' },
      _react2.default.createElement(_HeaderUserComponent2.default, null)
    )
  );
};

HeaderComponent.propTypes = {
  raspberries: _react.PropTypes.array,
  sendAction: _react.PropTypes.func.isRequired
};

HeaderComponent.contextTypes = {
  context: _react.PropTypes.object.isRequired
};

exports.default = HeaderComponent;
//# sourceMappingURL=HeaderComponent.js.map