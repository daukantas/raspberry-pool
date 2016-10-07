'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = init;
exports.broadcastAction = broadcastAction;

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _raspberriesManager = require('../raspberriesManager.server');

var raspberriesManager = _interopRequireWildcard(_raspberriesManager);

var _nightingale = require('nightingale');

var _nightingale2 = _interopRequireDefault(_nightingale);

var _raspberry = require('../actions/raspberry');

var _alpReactRedux = require('alp-react-redux');

var _alpWebsocket = require('alp-websocket');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _nightingale2.default('app.websocket.raspberries');

let clientsCount = 0;
let clientNs;

function init(io) {
    clientNs = io.of('client', socket => onConnection(socket));
}

function broadcastAction(action) {
    _assert(action, _tcombForked2.default.Object, 'action');

    logger.info('broadcast', action);
    (0, _alpReactRedux.emitAction)(clientNs.to('raspberries'), action);
}

function onConnection(socket) {
    if (clientsCount++ === 0) {
        raspberriesManager.raspberriesClientsConnected();
    }
    logger.info('connected', { clientsCount });

    socket.on('disconnect', () => {
        if (--clientsCount === 0) {
            raspberriesManager.raspberriesClientsDisonnected();
        }
        logger.info('disconnected', { clientsCount });
    });

    (0, _alpWebsocket.subscribe)(socket, 'raspberries', () => (0, _raspberry.updateAll)(raspberriesManager.getAll()));

    socket.on('raspberry:changeConfig', (id, config, callback) => {
        const newConfig = raspberriesManager.changeConfig(id, config);
        if (!newConfig) {
            callback('unknown raspberry');
        } else {
            callback(null, newConfig);
            const raspberry = raspberriesManager.getById(id);
            (0, _alpReactRedux.emitAction)(socket.broadcast.to('raspberries'), (0, _raspberry.updateConfig)(raspberry, newConfig));
        }
    });

    socket.on('raspberry:sendAction', (ids, action, callback) => {
        logger.info('sendAction raspberry', { ids, action });
        ids.forEach(id => {
            const raspberry = raspberriesManager.sendAction(id, action);
            if (raspberry) {
                (0, _alpReactRedux.emitAction)(socket.broadcast.to('raspberries'), (0, _raspberry.update)(raspberry));
            }
        });
        callback();
    });

    socket.on('raspberry:registerUnknown', (mac, info, callback) => {
        logger.info('register raspberry', { mac, info });
        const newRaspberry = raspberriesManager.add(mac, info);
        if (!newRaspberry) {
            callback(null, false);
        } else {
            callback(null, newRaspberry);
            (0, _alpReactRedux.emitAction)(socket.broadcast.to('raspberries'), (0, _raspberry.update)(newRaspberry));
        }
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
//# sourceMappingURL=raspberries.server.js.map