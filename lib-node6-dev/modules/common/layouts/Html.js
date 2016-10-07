"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsxFileName = "modules/common/layouts/Html.jsx";
exports.default = HtmlLayout;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _fodyHtmlLayout = require("fody-html-layout");

var _fodyHtmlLayout2 = _interopRequireDefault(_fodyHtmlLayout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HtmlLayout(props) {
    return _react2.default.createElement(_fodyHtmlLayout2.default, _extends({ preBody: _react2.default.createElement(
            "div",
            { id: "disconnected", __self: this,
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 4
                }
            },
            _react2.default.createElement(
                "div",
                {
                    __self: this,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 4
                    }
                },
                "disconnected"
            )
        ) }, props, {
        __self: this,
        __source: {
            fileName: _jsxFileName,
            lineNumber: 4
        }
    }));
}
//# sourceMappingURL=Html.js.map