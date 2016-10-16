'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./install/controller');

var _controller2 = _interopRequireDefault(_controller);

var _controller3 = require('./no-config/controller.server');

var _controller4 = _interopRequireDefault(_controller3);

var _controller5 = require('./raspberries/controller');

var _controller6 = _interopRequireDefault(_controller5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllers = new Map([['install', _controller2.default], ['no-config', _controller4.default], ['raspberries', _controller6.default]].filter(Boolean));

exports.default = controllers;
//# sourceMappingURL=controllers.js.map