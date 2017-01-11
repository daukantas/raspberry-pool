'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _UnknownRaspberryComponent = require('./UnknownRaspberryComponent');

var _UnknownRaspberryComponent2 = _interopRequireDefault(_UnknownRaspberryComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnknownRaspberryListComponent extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.shouldComponentUpdate = _function2.default, _temp;
  }

  render() {
    const { raspberries, offlineRaspberries, registerUnknown, sendAction } = this.props;

    if (!raspberries.length) {
      return null;
    }

    return _react2.default.createElement(
      'ul',
      { className: 'raspberry-list' },
      raspberries.map(raspberry => _react2.default.createElement(
        'li',
        { key: raspberry.id, className: 'raspberry-item' },
        _react2.default.createElement(_UnknownRaspberryComponent2.default, {
          raspberry: raspberry,
          offlineRaspberries: offlineRaspberries,
          registerUnknown: registerUnknown,
          sendAction: sendAction
        })
      ))
    );
  }
}
exports.default = UnknownRaspberryListComponent;
UnknownRaspberryListComponent.propTypes = {
  raspberries: _react.PropTypes.array.isRequired,
  offlineRaspberries: _react.PropTypes.array.isRequired,
  registerUnknown: _react.PropTypes.func.isRequired,
  sendAction: _react.PropTypes.func.isRequired
};
//# sourceMappingURL=UnknownRaspberryListComponent.js.map