import Logger from 'nightingale';
import { lt as semverLt } from 'semver';
import * as raspberriesManager from '../raspberriesManager.server';
import type { RaspberryType, RaspberryDataType } from '../types';

const logger = new Logger('app:websocket:raspberryClient');
const MIN_SUPPORTED_VERSION = '4.1.0';
const clients = new Map();
let ns;

export function emit(mac: string | boolean, eventName: string, ...data?: Array<any>) {
  logger.debug('emit', { mac, eventName, data });
  if (!mac) return;
  if (!clients.has(mac)) {
    logger.warn('cannot send message');
    return;
  }
  clients.get(mac).emit(eventName, ...data);
}

export function broadcastToRoom(room: string, eventName: string, ...data?: Array<any>) {
  logger.debug('broadcast room', { room, eventName, data });
  ns.to(room).emit(eventName, ...data);
}

export function registerRaspberry(raspberry: RaspberryType) {
  const client = clients.get(raspberry.online);
  if (client) {
    joinRooms(client, raspberry.data);
  }
}

export default function init(io) {
  if (ns) throw new Error('Already initialized');
  ns = io.of('raspberry-client', socket => onConnection(socket));
}

function joinRooms(socket, raspberryData: RaspberryDataType) {
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

    if (!version || semverLt(version, MIN_SUPPORTED_VERSION)) {
      socket.emit('selfUpdate');
      return;
    }

    clientMac = mac;
    clients.set(mac, socket);

    const externalIp = socket.handshake.address.replace(/^::ffff:/, '');

    raspberriesManager.setOnline(
      mac,
      userId,
      configTime,
      { hostname, externalIp, ip, screenState },
      raspberryData => joinRooms(socket, raspberryData),
    );
  });

  socket.on('screenshot', ({ buffer }, callback) => {
    logger.info('got screenshot', { hasBuffer: !!buffer });
    if (buffer) {
      // non async method
      raspberriesManager.changeScreenshot(clientMac, buffer);
    }
    callback();
  });

  socket.on('update', (data: Object) => {
    logger.info('received update', data);

    const patch = {};
    ['screenState', 'updating'].forEach((key: string) => {
      if (key in data) {
        patch[key] = data[key];
      }
    });

    raspberriesManager.update(clientMac, patch);
  });
}
