'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rethinkConnection = rethinkConnection;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _rethinkdb = require('liwi/rethinkdb');

var _alpNode = require('alp-node');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function rethinkConnection() {
  return _assert(function () {
    if (rethinkConnection._) return rethinkConnection._;

    return rethinkConnection._ = new _rethinkdb.RethinkConnection(_alpNode.config.get('db').get('rethinkdb'));
  }.apply(this, arguments), _rethinkdb.RethinkConnection, 'return value');
}

class Store extends _rethinkdb.RethinkStore {
  constructor(tableName) {
    _assert(tableName, _tcombForked2.default.String, 'tableName');

    super(rethinkConnection(), tableName);
  }
}
exports.default = Store;

function _assert(x, type, name) {
  function message() {
    return 'Invalid value ' + _tcombForked2.default.stringify(x) + ' supplied to ' + name + ' (expected a ' + _tcombForked2.default.getTypeName(type) + ')';
  }

  if (_tcombForked2.default.isType(type)) {
    if (!type.is(x)) {
      type(x, [name + ': ' + _tcombForked2.default.getTypeName(type)]);

      _tcombForked2.default.fail(message());
    }
  } else if (!(x instanceof type)) {
    _tcombForked2.default.fail(message());
  }

  return x;
}
//# sourceMappingURL=rethink.js.map