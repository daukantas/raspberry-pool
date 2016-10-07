'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var _jsxFileName = 'modules/raspberries/components/RaspberryListComponent.jsx';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _function = require('react-pure-render/function');

var _function2 = _interopRequireDefault(_function);

var _RaspberryComponent = require('./RaspberryComponent');

var _RaspberryComponent2 = _interopRequireDefault(_RaspberryComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RaspberryListComponent extends _react.Component {
    constructor() {
        var _temp;

        return _temp = super(...arguments), this.shouldComponentUpdate = _function2.default, _temp;
    }

    render() {
        var _props = this.props;
        const raspberries = _props.raspberries;
        const changeConfig = _props.changeConfig;
        const sendAction = _props.sendAction;

        return _react2.default.createElement(
            'ul',
            { className: 'raspberry-list', __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 16
                }
            },
            raspberries.map(raspberry => _react2.default.createElement(
                'li',
                { key: raspberry.id, className: 'raspberry-item', __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 17
                    }
                },
                _react2.default.createElement(_RaspberryComponent2.default, { raspberry: raspberry, changeConfig: changeConfig, sendAction: sendAction, __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 18
                    }
                })
            ))
        );
    }
}
exports.default = RaspberryListComponent;
RaspberryListComponent.propTypes = {
    raspberries: _react.PropTypes.array.isRequired,
    changeConfig: _react.PropTypes.func.isRequired,
    sendAction: _react.PropTypes.func.isRequired
};
//# sourceMappingURL=RaspberryListComponent.js.map