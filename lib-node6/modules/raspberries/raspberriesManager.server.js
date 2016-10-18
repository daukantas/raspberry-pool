'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVisibleForUser = isVisibleForUser;
exports.getById = getById;
exports.getByIdForUser = getByIdForUser;
exports.getByMac = getByMac;
exports.getAll = getAll;
exports.screenshotPath = screenshotPath;
exports.setOnline = setOnline;
exports.update = update;
exports.setOffline = setOffline;
exports.changeScreenshot = changeScreenshot;
exports.raspberriesClientsConnected = raspberriesClientsConnected;
exports.raspberriesClientsDisonnected = raspberriesClientsDisonnected;
exports.changeConfig = changeConfig;
exports.add = add;
exports.sendAction = sendAction;

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _raspberriesData = require('./raspberriesData.server');

var data = _interopRequireWildcard(_raspberriesData);

var _raspberryActionManager = require('./raspberryActionManager');

var _raspberryClient = require('./websocket/raspberryClient.server');

var _raspberries = require('./websocket/raspberries.server');

var _raspberry = require('./actions/raspberry');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _nightingale2.default('app.raspberriesManager');
const map = new Map();
const mapByMac = new Map();

data.items.forEach(item => {
  const raspberry = {
    id: item.id,
    data: item,
    registered: true,
    online: false,
    ip: null
  };

  map.set(item.id, raspberry);
  item.macAddresses.forEach(mac => {
    if (mapByMac.has(mac)) {
      throw new Error(`Mac defined more than one: ${ mac }`);
    }

    mapByMac.set(mac, raspberry);
  });
});

function isVisibleForUser(user, raspberry) {
  if (!raspberry.data) return raspberry.userId === user.id;
  return !!(raspberry.data.owner === user.id || raspberry.data.organisation && user.emailDomains.includes(raspberry.data.organisation));
}

function getById(id) {
  return map.get(id);
}

function getByIdForUser(user, id) {
  const raspberry = map.get(id);
  if (!raspberry || !isVisibleForUser(user, raspberry)) return null;
  return raspberry;
}

function getByMac(mac) {
  return mapByMac.get(mac);
}

function getAll(user) {
  return Array.from(map.values()).filter(isVisibleForUser.bind(null, user));
}

function screenshotPath(id) {
  return data.screenshotPath(id);
}

/* FROM raspberry clients */

function setOnline(mac, userId, configTime, info, callback) {
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

  (0, _raspberries.broadcastAction)(raspberry, unknownMac ? (0, _raspberry.add)(raspberry) : (0, _raspberry.update)(raspberry));

  if (raspberry.data) {
    if (raspberry.data.config.time !== configTime) {
      (0, _raspberryClient.emit)(raspberry.online, 'changeConfig', raspberry.data.config);
    }

    callback(raspberry.data);
  }
}

function update(mac, info) {
  let raspberry = getByMac(mac);
  if (!raspberry) {
    // should not happen...
    return;
  }

  if (info.screenState && raspberry.nextExpectedScreenState === info.screenState) {
    raspberry.nextExpectedScreenState = null;
  }

  Object.assign(raspberry, info);
  (0, _raspberries.broadcastAction)(raspberry, (0, _raspberry.update)(raspberry));
}

function setOffline(mac) {
  const raspberry = getByMac(mac);
  if (!raspberry) {
    // should not happen...
    return;
  }

  if (!raspberry.data) {
    map.delete(mac);
    mapByMac.delete(mac);
    (0, _raspberries.broadcastAction)(raspberry, (0, _raspberry.remove)(raspberry));
  } else {
    Object.assign(raspberry, {
      online: false
    });

    (0, _raspberries.broadcastAction)(raspberry, (0, _raspberry.update)(raspberry));
  }
}

function changeScreenshot(mac, screenshot) {
  const raspberry = getByMac(mac);
  if (!raspberry) {
    logger.warn('changeScreenshot, no raspberry', { mac });
    // should not happen...
    return;
  }

  data.saveScreenshot(raspberry.id, screenshot);
  (0, _raspberries.broadcastAction)(raspberry, (0, _raspberry.screenshotUpdated)(raspberry.id, Date.now()));
}

/* FROM browser clients */

const TIME_OUTDATED = 10000;
let intervalUpdateData;
let lastUpdated = Date.now() - TIME_OUTDATED;

const userIds = new Map();
const emailDomains = new Map();

const incMap = (map, key) => {
  const current = map.get(key) || 0;
  map.set(key, current + 1);
};

const decMap = (map, key) => {
  const current = map.get(key) || 0;
  if (current === 1) {
    map.delete(key);
  } else {
    map.set(key, current - 1);
  }
};

function raspberriesClientsConnected(userId, userEmailDomains) {
  const now = Date.now();

  incMap(userIds, userId);
  userEmailDomains.forEach(incMap.bind(null, emailDomains));

  if (intervalUpdateData) {
    return;
  }

  logger.info('update data: start interval');

  const requestUpdate = () => {
    logger.info('update data', { userIds, emailDomains });
    [userIds, emailDomains].forEach(map => Array.from(map.keys()).forEach(v => (0, _raspberryClient.broadcastToRoom)(v, 'screenshot')));
    lastUpdated = now;
  };

  if (lastUpdated > now - TIME_OUTDATED) {
    logger.debug('not outdated');
  } else {
    requestUpdate();
  }

  intervalUpdateData = setInterval(requestUpdate, TIME_OUTDATED);
}

function raspberriesClientsDisonnected(userId, userEmailDomains) {
  decMap(userIds, userId);
  userEmailDomains.forEach(decMap.bind(null, emailDomains));
  if (!userIds.size && !emailDomains.size && intervalUpdateData) {
    logger.info('stop interval');
    clearInterval(intervalUpdateData);
    intervalUpdateData = undefined;
  }
}

function changeConfig(raspberry, config) {
  logger.log('changeConfig', { id: raspberry.id, config });
  if (!raspberry.registered) {
    logger.warn('raspberry not registered', { id: raspberry.id });
    return;
  }

  const newConfig = data.changeConfig(raspberry.id, config);
  (0, _raspberryClient.emit)(raspberry.online, 'changeConfig', newConfig);
  return newConfig;
}

function add(id, userId, _ref) {
  let name = _ref.name;
  let addOrReplace = _ref.addOrReplace;
  let replaceId = _ref.id;

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

    (0, _raspberryClient.registerRaspberry)(existing);
    return existing;
  } else {
    raspberry.registered = true;
    raspberry.data = data.addNew(raspberry.id, userId, [raspberry.online], name);
  }

  (0, _raspberryClient.registerRaspberry)(raspberry);

  return raspberry;
}

function sendAction(raspberry, action) {
  if (!raspberry || !raspberry.registered) {
    logger.warn('unknown raspberry', { raspberry });
    // should not happen...
    return false;
  }

  Object.assign(raspberry, (0, _raspberryActionManager.updateFromAction)(action));
  (0, _raspberryClient.emit)(raspberry.online, 'action', action);
  return true;
}
//# sourceMappingURL=raspberriesManager.server.js.map