'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _websocketClient = require('liwi/websocket-client');

var _alpWebsocket = require('alp-websocket');

class Store extends _websocketClient.WebsocketStore {
  constructor(restName) {
    super(_alpWebsocket.websocket, restName);
  }
}
exports.default = Store;
//# sourceMappingURL=websocket.js.map