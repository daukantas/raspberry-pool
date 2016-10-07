'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _controller = require('./install/controller.browser');

var _controller2 = _interopRequireDefault(_controller);

var _controller3 = require('./raspberries/controller.browser');

var _controller4 = _interopRequireDefault(_controller3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllers = new Map([['install', _controller2.default], ['raspberries', _controller4.default]]);

exports.default = controllers;
//# sourceMappingURL=controllers.browser.js.map