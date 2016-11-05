'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeConfig = exports.actionSent = exports.sendingAction = exports.saved = exports.saving = exports.screenshotUpdated = exports.remove = exports.updateConfig = exports.update = exports.add = exports.updateAll = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.sendAction = sendAction;
exports.registerUnknown = registerUnknown;

var _alpReactRedux = require('alp-react-redux');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const updateAll = exports.updateAll = (0, _alpReactRedux.createAction)('UPDATE_ALL_RASPBERRIES', raspberries => ({ raspberries }));
const add = exports.add = (0, _alpReactRedux.createAction)('ADD_RASPBERRY', raspberry => ({ raspberry }));
const update = exports.update = (0, _alpReactRedux.createAction)('UPDATE_RASPBERRY', raspberry => ({ id: raspberry.id, raspberry }));
const updateConfig = exports.updateConfig = (0, _alpReactRedux.createAction)('UPDATE_RASPBERRY_CONFIG', (raspberry, config) => ({ id: raspberry.id, config }));
const remove = exports.remove = (0, _alpReactRedux.createAction)('REMOVE_RASPBERRY', raspberry => ({ id: raspberry.id }));
const screenshotUpdated = exports.screenshotUpdated = (0, _alpReactRedux.createAction)('SCREENSHOT_UPDATED', (id, screenshotDate) => ({ id, screenshotDate }));
const saving = exports.saving = (0, _alpReactRedux.createAction)('SAVING_RASPBERRY', raspberry => ({ id: raspberry.id }));
const saved = exports.saved = (0, _alpReactRedux.createAction)('SAVED_RASPBERRY', (raspberry, changes) => ({ id: raspberry.id, changes }));
const sendingAction = exports.sendingAction = (0, _alpReactRedux.createAction)('SENDING_ACTION_RASPBERRY', (raspberry, action) => ({ id: raspberry.id, action }));
const actionSent = exports.actionSent = (0, _alpReactRedux.createAction)('ACTION_SENT_RASPBERRY', (raspberry, action, result) => ({ id: raspberry.id, action, result }));

const changeConfig = exports.changeConfig = (raspberry, newConfig) => (() => {
  var _ref = _asyncToGenerator(function* (dispatch, _ref2) {
    let websocket = _ref2.websocket;

    dispatch(saving(raspberry));
    const configSaved = yield websocket.emit('raspberry:changeConfig', raspberry.id, newConfig);
    dispatch(updateConfig(raspberry, configSaved));
    dispatch(saved(raspberry, { data: _extends({}, raspberry.data, { config: configSaved }) }));
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

function sendAction(raspberries, action) {
  return (() => {
    var _ref3 = _asyncToGenerator(function* (dispatch, _ref4) {
      let websocket = _ref4.websocket;

      raspberries.forEach(function (raspberry) {
        return dispatch(sendingAction(raspberry, action));
      });
      const result = yield websocket.emit('raspberry:sendAction', raspberries.map(function (r) {
        return r.id;
      }), action);
      raspberries.forEach(function (raspberry) {
        return dispatch(actionSent(raspberry, action, result));
      });
    });

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  })();
}

function registerUnknown(raspberry, _ref5) {
  let name = _ref5.name,
      addOrReplace = _ref5.addOrReplace,
      id = _ref5.id;

  return (() => {
    var _ref6 = _asyncToGenerator(function* (dispatch, _ref7) {
      let websocket = _ref7.websocket;

      dispatch(saving(raspberry));
      const newRaspberry = yield websocket.emit('raspberry:registerUnknown', raspberry.id, { name, addOrReplace, id });
      if (newRaspberry) {
        if (newRaspberry.id !== raspberry.id) {
          dispatch(remove(raspberry));
          dispatch(update(newRaspberry));
        } else {
          dispatch(saved(newRaspberry, newRaspberry));
        }
      }
    });

    return function (_x5, _x6) {
      return _ref6.apply(this, arguments);
    };
  })();
}
//# sourceMappingURL=raspberry.js.map