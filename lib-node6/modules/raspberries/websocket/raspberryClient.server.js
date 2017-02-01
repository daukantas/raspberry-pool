'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emit = emit;
exports.broadcastToRoom = broadcastToRoom;
exports.registerRaspberry = registerRaspberry;
exports.default = init;

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _semver = require('semver');

var _raspberriesManager = require('../raspberriesManager.server');

var raspberriesManager = _interopRequireWildcard(_raspberriesManager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _nightingale2.default('app:websocket:raspberryClient');
const MIN_SUPPORTED_VERSION = '4.1.0';
const clients = new Map();
let ns;

function emit(mac, eventName, ...data) {
  logger.debug('emit', { mac, eventName, data });
  if (!mac) return;
  if (!clients.has(mac)) {
    logger.warn('cannot send message');
    return;
  }
  clients.get(mac).emit(eventName, ...data);
}

function broadcastToRoom(room, eventName, ...data) {
  if (clients.size === 0) return;
  logger.debug('broadcast room', { room, eventName, data });
  ns.to(room).emit(eventName, ...data);
}

function registerRaspberry(raspberry) {
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

  socket.on('hello', ({ mac, userId, version, configTime, ip, screenState, hostname }) => {
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

  socket.on('screenshot', ({ buffer }, callback) => {
    logger.info('got screenshot', { hasBuffer: !!buffer });
    if (buffer) {
      // non async method
      raspberriesManager.changeScreenshot(clientMac, buffer);
    }
    callback();
  });

  socket.on('update', data => {
    logger.info('received update', data);

    const patch = {};
    ['screenState', 'updating'].forEach(key => {
      if (key in data) {
        patch[key] = data[key];
      }
    });

    raspberriesManager.update(clientMac, patch);
  });
}
//# sourceMappingURL=raspberryClient.server.js.map