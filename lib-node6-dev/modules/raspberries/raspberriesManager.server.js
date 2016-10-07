'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getById = getById;
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

const logger = new _nightingale2.default('app.raspberriesManager');
const map = new Map();
const mapByMac = new Map();

data.items.forEach(item => {
    _assert(item, _tcombForked2.default.maybe(_types.RaspberryData), 'item');

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

function getById(id) {
    _assert(id, _tcombForked2.default.String, 'id');

    return _assert(function () {
        return map.get(id);
    }.apply(this, arguments), _tcombForked2.default.maybe(_types.Raspberry), 'return value');
}

function getByMac(mac) {
    _assert(mac, _tcombForked2.default.String, 'mac');

    return _assert(function () {
        return mapByMac.get(mac);
    }.apply(this, arguments), _tcombForked2.default.maybe(_types.Raspberry), 'return value');
}

function getAll() {
    return _assert(function () {
        return Array.from(map.values());
    }.apply(this, arguments), _tcombForked2.default.list(_types.Raspberry), 'return value');
}

function screenshotPath(id) {
    _assert(id, _tcombForked2.default.String, 'id');

    return _assert(function () {
        return data.screenshotPath(id);
    }.apply(this, arguments), _tcombForked2.default.String, 'return value');
}

/* FROM raspberry clients */

function setOnline(mac, configTime, info) {
    let raspberry = getByMac(mac);
    let unknownMac = false;
    if (!raspberry) {
        unknownMac = true;
        logger.warn('unknown mac, adding', { mac });
        raspberry = { id: mac };
        map.set(raspberry.id, raspberry);
        mapByMac.set(mac, raspberry);
    } else {
        logger.info('raspberry online', { mac });
        if (raspberry.updating) {
            raspberry.updating = false;
        }
    }

    raspberry.online = mac;
    Object.assign(raspberry, info);

    (0, _raspberries.broadcastAction)(unknownMac ? (0, _raspberry.add)(raspberry) : (0, _raspberry.update)(raspberry));

    if (raspberry.data && raspberry.data.config.time !== configTime) {
        (0, _raspberryClient.emit)(raspberry.online, 'changeConfig', raspberry.data.config);
    }
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
    (0, _raspberries.broadcastAction)((0, _raspberry.update)(raspberry));
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
        (0, _raspberries.broadcastAction)((0, _raspberry.remove)(raspberry));
    } else {
        Object.assign(raspberry, {
            online: false
        });

        (0, _raspberries.broadcastAction)((0, _raspberry.update)(raspberry));
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
    (0, _raspberries.broadcastAction)((0, _raspberry.screenshotUpdated)(raspberry.id, Date.now()));
}

/* FROM browser clients */

const TIME_OUTDATED = 30000;
let intervalUpdateData;
let lastUpdated = Date.now() - TIME_OUTDATED;

function raspberriesClientsConnected() {
    const now = Date.now();
    if (lastUpdated > now - TIME_OUTDATED) {
        logger.debug('not outdated');
        return;
    }
    lastUpdated = now;

    logger.info('update data');
    (0, _raspberryClient.broadcast)('screenshot');

    intervalUpdateData = setInterval(() => {
        logger.info('update data');
        (0, _raspberryClient.broadcast)('screenshot');
    }, TIME_OUTDATED);
}

function raspberriesClientsDisonnected() {
    if (intervalUpdateData) {
        clearInterval(intervalUpdateData);
    }
}

function changeConfig(id, config) {
    _assert(id, _tcombForked2.default.String, 'id');

    _assert(config, _types.RaspberryConfig, 'config');

    logger.log('changeConfig', { id, config });
    const raspberry = getById(id);
    if (!raspberry || !raspberry.registered) {
        logger.warn('unknown raspberry', { id });
        // should not happen...
        return;
    }

    const newConfig = data.changeConfig(id, config);
    (0, _raspberryClient.emit)(raspberry.online, 'changeConfig', newConfig);
    return newConfig;
}

function add(mac, _ref) {
    let name = _ref.name;
    let addOrReplace = _ref.addOrReplace;
    let id = _ref.id;

    _assert(mac, _tcombForked2.default.String, 'mac');

    logger.log('add', { mac, name, addOrReplace, id });
    const raspberry = getByMac(mac);
    if (!raspberry) {
        return logger.warn('unknown raspberry', { mac });
    } else if (raspberry.registered) {
        return logger.warn('raspberry already registered', { mac });
    }

    if (addOrReplace) {
        mapByMac.delete(mac);
        map.delete(mac);
        const existing = map.get(id);
        if (!existing) {
            return logger.warn('existing not found', { id });
        }

        if (addOrReplace === 'replace') {
            existing.data.macAddresses.forEach(mac => mapByMac.delete(mac));
            data.replaceMacAddresses(id, [mac]);
        } else {
            data.addMacAddress(id, mac);
        }
        mapByMac.set(mac, existing);
        existing.online = raspberry.online;
        existing.ip = raspberry.ip;
        existing.screenState = raspberry.screenState;

        return existing;
    } else {
        raspberry.registered = true;
        raspberry.data = data.addNew(raspberry.id, mac, name);
    }

    return raspberry;
}

function sendAction(id, action) {
    _assert(id, _tcombForked2.default.String, 'id');

    _assert(action, _tcombForked2.default.String, 'action');

    const raspberry = getById(id);
    if (!raspberry || !raspberry.registered) {
        logger.warn('unknown raspberry', { id });
        // should not happen...
        return Promise.resolve();
    }

    Object.assign(raspberry, (0, _raspberryActionManager.updateFromAction)(action));
    (0, _raspberryClient.emit)(raspberry.online, 'action', action);
    return raspberry;
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