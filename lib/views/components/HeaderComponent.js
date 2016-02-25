'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _raspberryActions = require('../raspberryActions');

var _raspberryActions2 = _interopRequireDefault(_raspberryActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let HeaderComponent = (_temp2 = _class = class HeaderComponent extends _react.Component {
    constructor() {
        var _temp;

        return _temp = super(...arguments), this.shouldComponentUpdate = _function2.default, _temp;
    }

    render() {
        var _props = this.props;
        const raspberries = _props.raspberries;
        const broadcastAction = _props.broadcastAction;

        const availableActions = _raspberryActions2.default.map(action => _extends({}, action, {
            raspberries: raspberries.filter(r => r.online && action.isVisible(r))
        })).filter(action => action.raspberries.length > 0);

        return _react2.default.createElement(
            'header',
            { className: 'header' },
            !availableActions.length ? '' : _react2.default.createElement(
                'div',
                { className: 'actions' },
                _react2.default.createElement(
                    'div',
                    { className: 'dropdown button' },
                    'Actions',
                    _react2.default.createElement(
                        'ul',
                        { className: 'list' },
                        availableActions.map(action => _react2.default.createElement(
                            'li',
                            { key: action.value,
                                onClick: () => broadcastAction(action.raspberries, action.value)
                            },
                            action.name
                        ))
                    )
                )
            )
        );
    }
}, _class.propTypes = {
    raspberries: _react.PropTypes.array.isRequired,
    broadcastAction: _react.PropTypes.func.isRequired
}, _temp2);
exports.default = HeaderComponent;
//# sourceMappingURL=HeaderComponent.js.map