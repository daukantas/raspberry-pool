'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emit = emit;
exports.broadcastToRoom = broadcastToRoom;
exports.registerRaspberry = registerRaspberry;
exports.default = init;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _semver = require('semver');

var _raspberriesManager = require('../raspberriesManager.server');

var raspberriesManager = _interopRequireWildcard(_raspberriesManager);

var _types = require('../types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _nightingale2.default('app.websocket.raspberryClient');
const MIN_SUPPORTED_VERSION = '4.1.0';
const clients = new Map();
let ns;

function emit(mac, eventName) {
  for (var _len = arguments.length, data = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    data[_key - 2] = arguments[_key];
  }

  _assert(mac, _tcombForked2.default.String, 'mac');

  _assert(eventName, _tcombForked2.default.String, 'eventName');

  _assert(data, _tcombForked2.default.maybe(_tcombForked2.default.list(_tcombForked2.default.Any)), 'data');

  logger.debug('emit', { mac, eventName, data });
  if (!clients.has(mac)) {
    logger.warn('cannot send message');
    return;
  }
  clients.get(mac).emit(eventName, ...data);
}

function broadcastToRoom(room, eventName) {
  for (var _len2 = arguments.length, data = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
    data[_key2 - 2] = arguments[_key2];
  }

  _assert(room, _tcombForked2.default.String, 'room');

  _assert(eventName, _tcombForked2.default.String, 'eventName');

  _assert(data, _tcombForked2.default.maybe(_tcombForked2.default.list(_tcombForked2.default.Any)), 'data');

  logger.debug('broadcast room', { room, eventName, data });
  ns.to(room).emit(eventName, ...data);
}

function registerRaspberry(raspberry) {
  _assert(raspberry, _types.RaspberryType, 'raspberry');

  const client = clients.get(raspberry.online);
  if (client) {
    joinRooms(client, raspberry.data);
  }
}

function init(io) {
  if (ns) throw new Error('Already initialized');
  ns = io.of('raspberry-client', socket => onConnection(socket));
}

function joinRooms(socket, raspberryData) {
  _assert(raspberryData, _types.RaspberryDataType, 'raspberryData');

  if (raspberryData.organisation) {
    socket.join(raspberryData.organisation);
  } else if (raspberryData.owner) {
    socket.join(raspberryData.owner);
  }
}

function onConnection(socket) {
  logger.info('client connected');
  let clientMac;

  socket.on('disconnect', () => {
    logger.info('client disconnected');
    if (clientMac && clients.get(clientMac) === socket) {
      clients.delete(clientMac);

      raspberriesManager.setOffline(clientMac);
    }
    clientMac = null;
  });

  socket.on('hello', (_ref) => {
    let mac = _ref.mac;
    let userId = _ref.userId;
    let version = _ref.version;
    let configTime = _ref.configTime;
    let ip = _ref.ip;
    let screenState = _ref.screenState;
    let hostname = _ref.hostname;

    logger.info('received hello', { mac, userId, version, configTime, ip, screenState, hostname });

    if (clientMac) {
      logger.warn('already have clientMac');
      return;
    }

    if (!version || (0, _semver.lt)(version, MIN_SUPPORTED_VERSION)) {
      socket.emit('selfUpdate');
      return;
    }

    clientMac = mac;
    clients.set(mac, socket);

    const externalIp = socket.handshake.address.replace(/^::ffff:/, '');

    raspberriesManager.setOnline(mac, userId, configTime, { hostname, externalIp, ip, screenState }, raspberryData => joinRooms(socket, raspberryData));
  });

  socket.on('screenshot', (_ref2, callback) => {
    let buffer = _ref2.buffer;

    logger.info('got screenshot', { hasBuffer: !!buffer });
    if (buffer) {
      // non async method
      raspberriesManager.changeScreenshot(clientMac, buffer);
    }
    callback();
  });

  socket.on('update', data => {
    _assert(data, _tcombForked2.default.Object, 'data');

    logger.info('received update', data);

    const patch = {};
    ['screenState', 'updating'].forEach(key => {
      _assert(key, _tcombForked2.default.String, 'key');

      if (key in data) {
        patch[key] = data[key];
      }
    });

    raspberriesManager.update(clientMac, patch);
  });
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
//# sourceMappingURL=raspberryClient.server.js.map