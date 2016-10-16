'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rethinkConnection = rethinkConnection;

var _rethinkdb = require('liwi/rethinkdb');

var _alpNode = require('alp-node');

function rethinkConnection() {
  if (rethinkConnection._) return rethinkConnection._;

  return rethinkConnection._ = new _rethinkdb.RethinkConnection(_alpNode.config.get('db').get('rethinkdb'));
}

class Store extends _rethinkdb.RethinkStore {
  constructor(tableName) {
    super(rethinkConnection(), tableName);
  }
}
exports.default = Store;
//# sourceMappingURL=rethink.js.map