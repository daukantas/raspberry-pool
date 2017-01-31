'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-disable jsx-a11y/no-static-element-interactions */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _raspberryActions = require('../../raspberryActions');

var _raspberryActions2 = _interopRequireDefault(_raspberryActions);

var _SpinnerComponent = require('../../../common/components/SpinnerComponent');

var _SpinnerComponent2 = _interopRequireDefault(_SpinnerComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ActionsComponent extends _react.PureComponent {

  render() {
    const { raspberries, sendAction, flat } = this.props;

    if (!raspberries || !raspberries.length) {
      return _react2.default.createElement('div', { className: 'actions' });
    }

    const availableActions = _raspberryActions2.default.map(action => _extends({}, action, {
      raspberries: raspberries.filter(r => r.online && action.isVisible(r))
    })).filter(action => action.raspberries.length > 0);

    if (!availableActions.length) {
      return _react2.default.createElement('div', { className: 'actions' });
    }

    return _react2.default.createElement(
      'div',
      { className: `actions dropdown button${!flat ? '' : ' flat'}` },
      'Actions',
      _react2.default.createElement(
        'ul',
        { className: 'list' },
        availableActions.map(action => _react2.default.createElement(
          'li',
          {
            key: action.value,
            onClick: () => {
              const raspberries = action.raspberries.filter(raspberry => !action.isInProgress(raspberry));
              if (raspberries.length) {
                return sendAction(raspberries, action.value);
              }
            }
          },
          action.name,
          _react2.default.createElement(_SpinnerComponent2.default, {
            active: !!raspberries.filter(raspberry => raspberry.actions && raspberry.actions[action.value] === 'sending' || action.isInProgress(raspberry)).length
          })
        ))
      )
    );
  }
}
exports.default = ActionsComponent;
ActionsComponent.propTypes = {
  flat: _react.PropTypes.bool,
  raspberries: _react.PropTypes.array.isRequired,
  sendAction: _react.PropTypes.func.isRequired
};
//# sourceMappingURL=ActionsComponent.js.map