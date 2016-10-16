"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RaspberryType = exports.RaspberryDataType = exports.RaspberryConfigType = undefined;

var _tcombForked = require("tcomb-forked");

var _tcombForked2 = _interopRequireDefault(_tcombForked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RaspberryConfigType = exports.RaspberryConfigType = _tcombForked2.default.interface({
  time: _tcombForked2.default.maybe(_tcombForked2.default.Number),
  display: _tcombForked2.default.maybe(_tcombForked2.default.String),
  url: _tcombForked2.default.maybe(_tcombForked2.default.String)
}, "RaspberryConfigType");

const RaspberryDataType = exports.RaspberryDataType = _tcombForked2.default.interface({
  id: _tcombForked2.default.String,
  name: _tcombForked2.default.String,
  macAddresses: _tcombForked2.default.list(_tcombForked2.default.String),
  config: RaspberryConfigType,
  owner: _tcombForked2.default.String,
  organisation: _tcombForked2.default.maybe(_tcombForked2.default.String)
}, "RaspberryDataType");

const RaspberryType = exports.RaspberryType = _tcombForked2.default.interface({
  id: _tcombForked2.default.String,
  data: _tcombForked2.default.maybe(RaspberryDataType),
  registered: _tcombForked2.default.maybe(_tcombForked2.default.Boolean),
  online: _tcombForked2.default.union([_tcombForked2.default.Boolean, _tcombForked2.default.String]),
  externalIp: _tcombForked2.default.union([_tcombForked2.default.String, _tcombForked2.default.Nil]),
  ip: _tcombForked2.default.union([_tcombForked2.default.String, _tcombForked2.default.Nil]),
  screenState: _tcombForked2.default.union([_tcombForked2.default.String, _tcombForked2.default.Nil])
}, "RaspberryType");
//# sourceMappingURL=types.js.map