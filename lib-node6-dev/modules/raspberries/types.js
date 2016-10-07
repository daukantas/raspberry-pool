"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Raspberry = exports.RaspberryData = exports.RaspberryConfig = undefined;

var _tcombForked = require("tcomb-forked");

var _tcombForked2 = _interopRequireDefault(_tcombForked);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const RaspberryConfig = exports.RaspberryConfig = _tcombForked2.default.interface({
    time: _tcombForked2.default.maybe(_tcombForked2.default.Number),
    display: _tcombForked2.default.maybe(_tcombForked2.default.String),
    url: _tcombForked2.default.maybe(_tcombForked2.default.String)
}, "RaspberryConfig");

const RaspberryData = exports.RaspberryData = _tcombForked2.default.interface({
    id: _tcombForked2.default.String,
    name: _tcombForked2.default.String,
    macAddresses: _tcombForked2.default.list(_tcombForked2.default.String),
    config: RaspberryConfig
}, "RaspberryData");

const Raspberry = exports.Raspberry = _tcombForked2.default.interface({
    id: _tcombForked2.default.String,
    data: _tcombForked2.default.maybe(RaspberryData),
    registered: _tcombForked2.default.maybe(_tcombForked2.default.Boolean),
    online: _tcombForked2.default.union([_tcombForked2.default.Boolean, _tcombForked2.default.String]),
    ip: _tcombForked2.default.union([_tcombForked2.default.String, _tcombForked2.default.Nil]),
    screenState: _tcombForked2.default.union([_tcombForked2.default.String, _tcombForked2.default.Nil])
}, "Raspberry");
//# sourceMappingURL=types.js.map