'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = init;
exports.broadcastAction = broadcastAction;

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _alpReactRedux = require('alp-react-redux');

var _alpWebsocket = require('alp-websocket');

var _raspberriesManager = require('../raspberriesManager.server');

var raspberriesManager = _interopRequireWildcard(_raspberriesManager);

var _raspberry = require('../actions/raspberry');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _nightingale2.default('app.websocket.raspberries');

let clientsCount = 0;
let clientNs;

function init(io, app) {
  clientNs = io.of('client', socket => onConnection(socket, app));
}

function broadcastAction(raspberry, action) {
  const room = !raspberry.data ? `id#${ raspberry.userId }` : raspberry.data.organisation || `id#${ raspberry.data.owner }`;

  logger.info('broadcast', _extends({ room }, action));
  if (room) {
    (0, _alpReactRedux.emitAction)(clientNs.to(`raspberries_${ room }`), action);
  }
}

function onConnection(socket, app) {
  clientsCount += 1;
  logger.info('connected', { clientsCount });

  const user = app.websocket.users.get(socket.client.id);

  if (!user) return;

  raspberriesManager.raspberriesClientsConnected(user.id, user.emailDomains);

  socket.on('disconnect', () => {
    if (--clientsCount === 0) {
      raspberriesManager.raspberriesClientsDisonnected(user.id, user.emailDomains);
    }
    logger.info('disconnected', { clientsCount });
  });

  (0, _alpWebsocket.subscribe)(socket, 'raspberries', () => {
    socket.join(`raspberries_id#${ user.id }`);
    user.emailDomains.forEach(domain => socket.join(`raspberries_${ domain }`));
    (0, _alpReactRedux.emitAction)(socket, (0, _raspberry.updateAll)(raspberriesManager.getAll(user)));
  }, () => {
    socket.leave(`raspberries_id#${ user.id }`);
    user.emailDomains.forEach(domain => socket.leave(`raspberries_${ domain }`));
  });

  socket.on('raspberry:changeConfig', (id, config, callback) => {
    console.log('user', user);
    const raspberry = raspberriesManager.getByIdForUser(user, id);
    if (!raspberry) {
      logger.warn('changeConfig: invalid raspberry', { id });
      callback('invalid raspberry');
      return;
    }
    const newConfig = raspberriesManager.changeConfig(raspberry, config);
    if (!newConfig) {
      callback('invalid raspberry');
    } else {
      callback(null, newConfig);
      (0, _alpReactRedux.emitAction)(socket.broadcast.to('raspberries'), (0, _raspberry.updateConfig)(raspberry, newConfig));
    }
  });

  socket.on('raspberry:sendAction', (ids, action, callback) => {
    logger.info('sendAction raspberry', { ids, action });
    ids.map(raspberriesManager.getByIdForUser.bind(null, user)).filter(Boolean).forEach(raspberry => {
      if (raspberriesManager.sendAction(raspberry, action)) {
        (0, _alpReactRedux.emitAction)(socket.broadcast.to('raspberries'), (0, _raspberry.update)(raspberry));
      }
    });
    callback();
  });

  socket.on('raspberry:registerUnknown', (id, info, callback) => {
    logger.info('register raspberry', { id, info });
    const newRaspberry = raspberriesManager.add(id, user.id, info);
    if (!newRaspberry) {
      callback(null, false);
    } else {
      callback(null, newRaspberry);
      broadcastAction(newRaspberry, (0, _raspberry.update)(newRaspberry));
    }
  });
}
//# sourceMappingURL=raspberries.server.js.map