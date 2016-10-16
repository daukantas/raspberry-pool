'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.items = undefined;
exports.getById = getById;
exports.changeConfig = changeConfig;
exports.addNew = addNew;
exports.replaceMacAddresses = replaceMacAddresses;
exports.addMacAddress = addMacAddress;
exports.saveScreenshot = saveScreenshot;
exports.screenshotPath = screenshotPath;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _fs = require('fs');

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* import { slugify as _slugify } from 'transliteration';

function slugify(string) {
    return _slugify(string, { lowercase: true, separator: '-' });
} */

const dataPath = `${ __dirname }/../../../data`;
const dataFilename = `${ dataPath }/raspberries.json`;

const items = exports.items = _assert(JSON.parse((0, _fs.readFileSync)(dataFilename)), _tcombForked2.default.list(_types.RaspberryDataType), 'items');
const map = new Map(items.map(item => [item.id, item]));

if (map.size !== items.length) {
  throw new Error('Duplicated id');
}

function save() {
  (0, _fs.writeFileSync)(dataFilename, JSON.stringify(items, null, 4));
}

function getById(id) {
  _assert(id, _tcombForked2.default.String, 'id');

  return _assert(function () {
    return map.get(id);
  }.apply(this, arguments), _tcombForked2.default.maybe(_types.RaspberryDataType), 'return value');
}

function changeConfig(id, config) {
  _assert(id, _tcombForked2.default.String, 'id');

  _assert(config, _types.RaspberryConfigType, 'config');

  if (!map.has(id)) {
    throw new Error('Invalid id');
  }

  // TODO configManager
  config = Object.assign({}, {
    time: Date.now(),
    display: config.display || 'kweb3',
    url: config.url.trim()
  });
  map.get(id).config = config;
  save();

  return config;
}

// ip should not be written
function addNew(id, owner, macAddresses, name) {
  _assert(id, _tcombForked2.default.String, 'id');

  _assert(owner, _tcombForked2.default.String, 'owner');

  _assert(macAddresses, _tcombForked2.default.list(_tcombForked2.default.String), 'macAddresses');

  _assert(name, _tcombForked2.default.String, 'name');

  const newRaspberryItem = _assert({
    id,
    name,
    macAddresses,
    config: {},
    owner
  }, _types.RaspberryDataType, 'newRaspberryItem');

  if (map.has(newRaspberryItem.id)) {
    throw new Error(`Already has id: ${ newRaspberryItem.id }`);
  }

  items.push(newRaspberryItem);
  map.set(newRaspberryItem.id, newRaspberryItem);
  save();

  return newRaspberryItem;
}

function replaceMacAddresses(id, newMacAddresses) {
  _assert(id, _tcombForked2.default.String, 'id');

  _assert(newMacAddresses, _tcombForked2.default.list(_tcombForked2.default.String), 'newMacAddresses');

  if (!map.has(id)) {
    throw new Error(`Invalid id: "${ id }"`);
  }

  map.get(id).macAddresses = newMacAddresses;
  save();
}

function addMacAddress(id, newMacAddress) {
  _assert(id, _tcombForked2.default.String, 'id');

  _assert(newMacAddress, _tcombForked2.default.String, 'newMacAddress');

  if (!map.has(id)) {
    throw new Error(`Invalid id: "${ id }"`);
  }

  map.get(id).macAddresses.push(newMacAddress);
  save();
}

function saveScreenshot(id, screenshot) {
  _assert(id, _tcombForked2.default.String, 'id');

  _assert(screenshot, Buffer, 'screenshot');

  (0, _fs.writeFileSync)(screenshotPath(id), screenshot);
}

function screenshotPath(id) {
  _assert(id, _tcombForked2.default.String, 'id');

  return _assert(function () {
    return `${ dataPath }/screenshot-${ id }.png`;
  }.apply(this, arguments), _tcombForked2.default.String, 'return value');
}

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
//# sourceMappingURL=raspberriesData.server.js.map