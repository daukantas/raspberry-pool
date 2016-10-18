import Logger from 'nightingale';
import type { UserType } from 'alp-auth/types';
import * as data from './raspberriesData.server';
import { updateFromAction } from './raspberryActionManager';
import {
  emit as emitToRaspberryClient,
  broadcastToRoom as broadcastToRoomRaspberryClients,
  registerRaspberry as registerRaspberryClient,
} from './websocket/raspberryClient.server';
import { broadcastAction as raspberriesBroadcastAction } from './websocket/raspberries.server';
import type { RaspberryConfigType, RaspberryDataType, RaspberryType } from './types';
import {
  add as addAction,
  update as updateAction,
  remove as removeAction,
  screenshotUpdated as screenshotUpdatedAction,
} from './actions/raspberry';

const logger = new Logger('app.raspberriesManager');
const map = new Map();
const mapByMac = new Map();

data.items.forEach((item: ?RaspberryDataType) => {
  const raspberry = {
    id: item.id,
    data: item,
    registered: true,
    online: false,
    ip: null,
  };

  map.set(item.id, raspberry);
  item.macAddresses.forEach((mac: string) => {
    if (mapByMac.has(mac)) {
      throw new Error(`Mac defined more than one: ${mac}`);
    }

    mapByMac.set(mac, raspberry);
  });
});

export function isVisibleForUser(user: UserType, raspberry: RaspberryType): boolean {
  if (!raspberry.data) return raspberry.userId === user.id;
  return !!(
    raspberry.data.owner === user.id || (
      raspberry.data.organisation && user.emailDomains.includes(raspberry.data.organisation)
    )
  );
}

export function getById(id: string): ?RaspberryType {
  return map.get(id);
}

export function getByIdForUser(user: UserType, id: string): ?RaspberryType {
  const raspberry = map.get(id);
  if (!raspberry || !isVisibleForUser(user, raspberry)) return null;
  return raspberry;
}

export function getByMac(mac: string): ?RaspberryType {
  return mapByMac.get(mac);
}

export function getAll(user: UserType): Array<RaspberryType> {
  return Array.from(map.values()).filter(isVisibleForUser.bind(null, user));
}

export function screenshotPath(id: string): string {
  return data.screenshotPath(id);
}

/* FROM raspberry clients */

export function setOnline(
  mac: string,
  userId: ?string,
  configTime: ?number,
  info,
  callback: Function,
): ?RaspberryDataType {
  let raspberry = getByMac(mac);
  let unknownMac = false;
  if (!raspberry) {
    unknownMac = true;
    logger.warn('unknown mac, adding', { mac });
    raspberry = { id: mac };
    map.set(raspberry.id, raspberry);
    mapByMac.set(mac, raspberry);

    if (!userId) {
      logger.warn('new raspberry without owner');
    } else {
      raspberry.userId = userId;
    }
  } else {
    logger.info('raspberry online', { mac });
    if (raspberry.updating) {
      raspberry.updating = false;
    }
  }

  raspberry.online = mac;
  Object.assign(raspberry, info);

  raspberriesBroadcastAction(
    raspberry,
    unknownMac ? addAction(raspberry) : updateAction(raspberry),
  );

  if (raspberry.data) {
    if (raspberry.data.config.time !== configTime) {
      emitToRaspberryClient(raspberry.online, 'changeConfig', raspberry.data.config);
    }

    callback(raspberry.data);
  }
}

export function update(mac: string, info) {
  let raspberry = getByMac(mac);
  if (!raspberry) {
    // should not happen...
    return;
  }

  if (info.screenState && raspberry.nextExpectedScreenState === info.screenState) {
    raspberry.nextExpectedScreenState = null;
  }

  Object.assign(raspberry, info);
  raspberriesBroadcastAction(raspberry, updateAction(raspberry));
}

export function setOffline(mac: string) {
  const raspberry = getByMac(mac);
  if (!raspberry) {
    // should not happen...
    return;
  }

  if (!raspberry.data) {
    map.delete(mac);
    mapByMac.delete(mac);
    raspberriesBroadcastAction(raspberry, removeAction(raspberry));
  } else {
    Object.assign(raspberry, {
      online: false,
      // keep last known ip
    });

    raspberriesBroadcastAction(raspberry, updateAction(raspberry));
  }
}

export function changeScreenshot(mac: string, screenshot: Buffer) {
  const raspberry = getByMac(mac);
  if (!raspberry) {
    logger.warn('changeScreenshot, no raspberry', { mac });
    // should not happen...
    return;
  }

  data.saveScreenshot(raspberry.id, screenshot);
  raspberriesBroadcastAction(raspberry, screenshotUpdatedAction(raspberry.id, Date.now()));
}

/* FROM browser clients */

const TIME_OUTDATED = 10000;
let intervalUpdateData;
let lastUpdated = Date.now() - TIME_OUTDATED;

const userIds = new Map();
const emailDomains = new Map();

const incMap = (map: Map, key: any) => {
  const current = map.get(key) || 0;
  map.set(key, current + 1);
};

const decMap = (map: Map, key: any) => {
  const current = map.get(key) || 0;
  if (current === 1) {
    map.delete(key);
  } else {
    map.set(key, current - 1);
  }
};

export function raspberriesClientsConnected(userId: string, userEmailDomains: Array<string>) {
  const now = Date.now();

  incMap(userIds, userId);
  userEmailDomains.forEach(incMap.bind(null, emailDomains));

  if (intervalUpdateData) {
    return;
  }

  logger.info('update data: start interval');

  const requestUpdate = () => {
    logger.info('update data', { userIds, emailDomains });
    [userIds, emailDomains].forEach(map => (
      Array.from(map.keys()).forEach(v => broadcastToRoomRaspberryClients(v, 'screenshot'))
    ));
    lastUpdated = now;
  };

  if (lastUpdated > now - TIME_OUTDATED) {
    logger.debug('not outdated');
  } else {
    requestUpdate();
  }

  intervalUpdateData = setInterval(requestUpdate, TIME_OUTDATED);
}

export function raspberriesClientsDisonnected(userId: string, userEmailDomains: Array<string>) {
  decMap(userIds, userId);
  userEmailDomains.forEach(decMap.bind(null, emailDomains));
  if (!userIds.size && !emailDomains.size && intervalUpdateData) {
    logger.info('stop interval');
    clearInterval(intervalUpdateData);
    intervalUpdateData = undefined;
  }
}

export function changeConfig(raspberry: RaspberryType, config: RaspberryConfigType) {
  logger.log('changeConfig', { id: raspberry.id, config });
  if (!raspberry.registered) {
    logger.warn('raspberry not registered', { id: raspberry.id });
    return;
  }

  const newConfig = data.changeConfig(raspberry.id, config);
  emitToRaspberryClient(raspberry.online, 'changeConfig', newConfig);
  return newConfig;
}

export function add(id: string, userId: string, { name, addOrReplace, id: replaceId }) {
  logger.log('add', { id, name, addOrReplace, replaceId });
  const raspberry = getById(id);
  if (!raspberry) {
    logger.warn('unknown raspberry', { id });
    return;
  } else if (raspberry.registered) {
    logger.warn('raspberry already registered', { id });
    return;
  } else if (!raspberry.online) {
    logger.warn('raspberry not online', { id });
  }


  if (addOrReplace) {
    mapByMac.delete(raspberry.online);
    map.delete(id);
    const existing = getById(replaceId);
    if (!existing) {
      logger.warn('existing not found', { replaceId });
      return;
    }

    if (existing.data.owner !== userId) {
      logger.warn('existing owner different', { replaceId, owner: existing.data.owner, userId });
      return;
    }

    if (addOrReplace === 'replace') {
      existing.data.macAddresses.forEach(mac => mapByMac.delete(mac));
      data.replaceMacAddresses(existing.id, [raspberry.online]);
    } else {
      data.addMacAddress(existing.id, raspberry.online);
    }
    mapByMac.set(id, existing);
    existing.online = raspberry.online;
    existing.ip = raspberry.ip;
    existing.screenState = raspberry.screenState;

    registerRaspberryClient(existing);
    return existing;
  } else {
    raspberry.registered = true;
    raspberry.data = data.addNew(raspberry.id, userId, [raspberry.online], name);
  }

  registerRaspberryClient(raspberry);

  return raspberry;
}

export function sendAction(raspberry: RaspberryType, action: string): boolean {
  if (!raspberry || !raspberry.registered) {
    logger.warn('unknown raspberry', { raspberry });
    // should not happen...
    return false;
  }

  Object.assign(raspberry, updateFromAction(action));
  emitToRaspberryClient(raspberry.online, 'action', action);
  return true;
}
