'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.isConnected = isConnected;
exports.emit = emit;
exports.on = on;
exports.off = off;

var _alpWebsocket = require('alp-websocket');

var _alpWebsocket2 = _interopRequireDefault(_alpWebsocket);

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global document */
const logger = new _nightingale2.default('app.websocket');
let socket;

function init(app) {
  socket = (0, _alpWebsocket2.default)(app, 'client');

  socket.on('connect', () => {
    const disconnected = document.getElementById('disconnected');
    if (disconnected) {
      disconnected.style.display = 'none';
    }
  });

  socket.on('disconnect', () => {
    const disconnected = document.getElementById('disconnected');
    if (disconnected) {
      disconnected.style.display = 'block';
    }
  });
}

function isConnected() {
  return socket && socket.connected;
}

function emit(eventName) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  logger.debug('emit', { eventName, args });
  return socket.emit(eventName, ...args);
}

function on(type, handler) {
  socket.on(type, handler);
  return handler;
}

function off(type, handler) {
  socket.off(type, handler);
}
//# sourceMappingURL=index.browser.js.map