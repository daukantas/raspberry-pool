'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _alpReactRedux = require('alp-react-redux');

var _raspberry = require('../actions/raspberry');

var _raspberryActionManager = require('../raspberryActionManager');

const raspberryReducer = (0, _alpReactRedux.createReducer)({
  [_raspberry.update]: (state, { raspberry }) => raspberry,
  [_raspberry.updateConfig]: (raspberry, { config }) => _extends({}, raspberry, {
    data: _extends({}, raspberry.data, { config })
  }),
  [_raspberry.remove]: (state, { raspberry }) => raspberry,
  [_raspberry.screenshotUpdated]: raspberry => _extends({}, raspberry),
  [_raspberry.saving]: raspberry => _extends({}, raspberry, { saving: true }),
  [_raspberry.saved]: raspberry => _extends({}, raspberry, { saving: false }),
  [_raspberry.sendingAction]: (raspberry, { changes, action }) => _extends({}, raspberry, changes, {
    actions: _extends({}, raspberry.actions, {
      [action]: 'sending'
    })
  }),
  [_raspberry.actionSent]: (raspberry, { changes, action }) => _extends({}, raspberry, changes, {
    actions: _extends({}, raspberry.actions, {
      [action]: null
    })
  }, (0, _raspberryActionManager.updateFromAction)(action))
});

const raspberryHandler = (raspberries, action) => {
  if (!action.id) throw new Error(`Missing action.id, ${action.type}`);
  return raspberries.map(raspberry => {
    if (raspberry.id !== action.id) return raspberry;
    return raspberryReducer(raspberry, action);
  });
};

exports.default = (0, _alpReactRedux.createReducer)(() => [], {
  [_raspberry.updateAll]: (state, { raspberries }) => raspberries,
  [_raspberry.add]: (raspberries, { raspberry }) => [...raspberries, raspberry],
  [_raspberry.remove]: (raspberries, { id }) => raspberries.filter(r => r.id !== id),
  [_raspberry.update]: raspberryHandler,
  [_raspberry.updateConfig]: raspberryHandler,
  [_raspberry.screenshotUpdated]: raspberryHandler,
  [_raspberry.saving]: raspberryHandler,
  [_raspberry.saved]: raspberryHandler,
  [_raspberry.sendingAction]: raspberryHandler,
  [_raspberry.actionSent]: raspberryHandler
});
//# sourceMappingURL=raspberries.js.map