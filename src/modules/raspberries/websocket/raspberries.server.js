import Logger from 'nightingale/src';
import { emitAction } from 'alp-react-redux/src';
import { subscribe } from 'alp-websocket/src';
import type { UserType } from 'alp-auth/types';
import * as raspberriesManager from '../raspberriesManager.server';
import { updateAll, update, updateConfig } from '../actions/raspberry';
import type { RaspberryType } from '../types';

const logger = new Logger('app:websocket:raspberries');

let clientsCount = 0;
let clientNs;

export default function init(io, app) {
  clientNs = io.of('client', socket => onConnection(socket, app));
}

export function broadcastAction(raspberry: RaspberryType, action: Object) {
  const room = !raspberry.data ? `id#${raspberry.userId}` : (
    raspberry.data.organisation || `id#${raspberry.data.owner}`
  );

  logger.info('broadcast', { room, ...action });
  if (room) {
    emitAction(clientNs.to(`raspberries_${room}`), action);
  }
}

function onConnection(socket, app) {
  const user: ?UserType = app.websocket.users.get(socket.client.id);

  if (!user) return;

  clientsCount += 1;
  logger.info('connected', { clientsCount });
  raspberriesManager.raspberriesClientsConnected(user.id, user.emailDomains);

  socket.on('disconnect', () => {
    clientsCount -= 1;
    logger.info('disconnected', { clientsCount });
    raspberriesManager.raspberriesClientsDisonnected(user.id, user.emailDomains);
  });

  subscribe(
    socket,
    'raspberries',
    () => {
      socket.join(`raspberries_id#${user.id}`);
      user.emailDomains.forEach(domain => socket.join(`raspberries_${domain}`));
      emitAction(socket, updateAll(raspberriesManager.getAll(user)));
    },
    () => {
      socket.leave(`raspberries_id#${user.id}`);
      user.emailDomains.forEach(domain => socket.leave(`raspberries_${domain}`));
    },
  );

  socket.on('raspberry:changeConfig', (id: string, config, callback: Function) => {
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
      emitAction(socket.broadcast.to('raspberries'), updateConfig(raspberry, newConfig));
    }
  });

  socket.on('raspberry:sendAction', (ids: Array<string>, action: string, callback: Function) => {
    logger.info('sendAction raspberry', { ids, action });
    ids
      .map(raspberriesManager.getByIdForUser.bind(null, user))
      .filter(Boolean)
      .forEach((raspberry: RaspberryType) => {
        if (raspberriesManager.sendAction(raspberry, action)) {
          emitAction(socket.broadcast.to('raspberries'), update(raspberry));
        }
      });
    callback();
  });

  socket.on('raspberry:registerUnknown', (id: string, info, callback: Function) => {
    logger.info('register raspberry', { id, info });
    const newRaspberry = raspberriesManager.add(id, user.id, info);
    if (!newRaspberry) {
      callback(null, false);
    } else {
      callback(null, newRaspberry);
      broadcastAction(newRaspberry, update(newRaspberry));
    }
  });
}
