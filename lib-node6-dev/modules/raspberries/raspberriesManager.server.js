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

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _raspberriesData = require('./raspberriesData.server');

var data = _interopRequireWildcard(_raspberriesData);

var _raspberryActionManager = require('./raspberryActionManager');

var _raspberryClient = require('./websocket/raspberryClient.server');

var _raspberries = require('./websocket/raspberries.server');

var _types = require('./types');

var _raspberry = require('./actions/raspberry');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _alpAuthTypes = require('alp-auth/types');

const UserType = _alpAuthTypes.UserType || _tcombForked2.default.Any;


const logger = new _nightingale2.default('app.raspberriesManager');
const map = new Map();
const mapByMac = new Map();

data.items.forEach(item => {
  _assert(item, _tcombForked2.default.maybe(_types.RaspberryDataType), 'item');

  const raspberry = {
    id: item.id,
    data: item,
    registered: true,
    online: false,
    ip: null
  };

  map.set(item.id, raspberry);
  item.macAddresses.forEach(mac => {
    _assert(mac, _tcombForked2.default.String, 'mac');

    if (mapByMac.has(mac)) {
      throw new Error(`Mac defined more than one: ${ mac }`);
    }

    mapByMac.set(mac, raspberry);
  });
});

function isVisibleForUser(user, raspberry) {
  _assert(user, UserType, 'user');

  _assert(raspberry, _types.RaspberryType, 'raspberry');

  return _assert(function () {
    if (!raspberry.data) return raspberry.userId === user.id;
    return !!(raspberry.data.owner === user.id || raspberry.data.organisation && user.emailDomains.includes(raspberry.data.organisation));
  }.apply(this, arguments), _tcombForked2.default.Boolean, 'return value');
}

function getById(id) {
  _assert(id, _tcombForked2.default.String, 'id');

  return _assert(function () {
    return map.get(id);
  }.apply(this, arguments), _tcombForked2.default.maybe(_types.RaspberryType), 'return value');
}

function getByIdForUser(user, id) {
  _assert(user, UserType, 'user');

  _assert(id, _tcombForked2.default.String, 'id');

  return _assert(function () {
    const raspberry = map.get(id);
    if (!raspberry || !isVisibleForUser(user, raspberry)) return null;
    return raspberry;
  }.apply(this, arguments), _tcombForked2.default.maybe(_types.RaspberryType), 'return value');
}

function getByMac(mac) {
  _assert(mac, _tcombForked2.default.String, 'mac');

  return _assert(function () {
    return mapByMac.get(mac);
  }.apply(this, arguments), _tcombForked2.default.maybe(_types.RaspberryType), 'return value');
}

function getAll(user) {
  _assert(user, UserType, 'user');

  return _assert(function () {
    return Array.from(map.values()).filter(isVisibleForUser.bind(null, user));
  }.apply(this, arguments), _tcombForked2.default.list(_types.RaspberryType), 'return value');
}

function screenshotPath(id) {
  _assert(id, _tcombForked2.default.String, 'id');

  return _assert(function () {
    return data.screenshotPath(id);
  }.apply(this, arguments), _tcombForked2.default.String, 'return value');
}

/* FROM raspberry clients */

function setOnline(mac, userId, configTime, info, callback) {
  _assert(mac, _tcombForked2.default.String, 'mac');

  _assert(userId, _tcombForked2.default.maybe(_tcombForked2.default.String), 'userId');

  _assert(configTime, _tcombForked2.default.maybe(_tcombForked2.default.Number), 'configTime');

  _assert(callback, _tcombForked2.default.Function, 'callback');

  return _assert(function () {
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
  }.apply(this, arguments), _tcombForked2.default.maybe(_types.RaspberryDataType), 'return value');
}

function update(mac, info) {
  _assert(mac, _tcombForked2.default.String, 'mac');

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
  _assert(mac, _tcombForked2.default.String, 'mac');

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
  _assert(mac, _tcombForked2.default.String, 'mac');

  _assert(screenshot, Buffer, 'screenshot');

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
  _assert(map, Map, 'map');

  _assert(key, _tcombForked2.default.Any, 'key');

  const current = map.get(key) || 0;
  map.set(key, current + 1);
};

const decMap = (map, key) => {
  _assert(map, Map, 'map');

  _assert(key, _tcombForked2.default.Any, 'key');

  const current = map.get(key) || 0;
  if (current === 1) {
    map.delete(key);
  } else {
    map.set(key, current - 1);
  }
};

function raspberriesClientsConnected(userId, userEmailDomains) {
  _assert(userId, _tcombForked2.default.String, 'userId');

  _assert(userEmailDomains, _tcombForked2.default.list(_tcombForked2.default.String), 'userEmailDomains');

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
  _assert(userId, _tcombForked2.default.String, 'userId');

  _assert(userEmailDomains, _tcombForked2.default.list(_tcombForked2.default.String), 'userEmailDomains');

  decMap(userIds, userId);
  userEmailDomains.forEach(decMap.bind(null, emailDomains));
  if (!userIds.size && !emailDomains.size && intervalUpdateData) {
    logger.info('stop interval');
    clearInterval(intervalUpdateData);
  }
}

function changeConfig(raspberry, config) {
  _assert(raspberry, _types.RaspberryType, 'raspberry');

  _assert(config, _types.RaspberryConfigType, 'config');

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

  _assert(id, _tcombForked2.default.String, 'id');

  _assert(userId, _tcombForked2.default.String, 'userId');

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
  _assert(raspberry, _types.RaspberryType, 'raspberry');

  _assert(action, _tcombForked2.default.String, 'action');

  return _assert(function () {
    if (!raspberry || !raspberry.registered) {
      logger.warn('unknown raspberry', { raspberry });
      // should not happen...
      return false;
    }

    Object.assign(raspberry, (0, _raspberryActionManager.updateFromAction)(action));
    (0, _raspberryClient.emit)(raspberry.online, 'action', action);
    return true;
  }.apply(this, arguments), _tcombForked2.default.Boolean, 'return value');
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
//# sourceMappingURL=raspberriesManager.server.js.map