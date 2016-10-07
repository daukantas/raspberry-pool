'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tcombForked = require('tcomb-forked');

var _tcombForked2 = _interopRequireDefault(_tcombForked);

var _alpReactRedux = require('alp-react-redux');

var _raspberry = require('../actions/raspberry');

var _raspberryActionManager = require('../raspberryActionManager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const raspberryReducer = (0, _alpReactRedux.createReducer)({
  [_raspberry.update]: (state, _ref) => {
    let raspberry = _ref.raspberry;
    return raspberry;
  },
  [_raspberry.updateConfig]: (raspberry, _ref2) => {
    var _assert2 = _assert(_ref2, _tcombForked2.default.interface({
      config: _tcombForked2.default.Object
    }), '{ config }');

    let config = _assert2.config;

    _assert({
      config
    }, _tcombForked2.default.interface({
      config: _tcombForked2.default.Object
    }), '{ config }');

    return _extends({}, raspberry, {
      data: _extends({}, raspberry.data, { config })
    });
  },
  [_raspberry.remove]: (state, _ref3) => {
    let raspberry = _ref3.raspberry;
    return raspberry;
  },
  [_raspberry.screenshotUpdated]: raspberry => _extends({}, raspberry),
  [_raspberry.saving]: raspberry => _extends({}, raspberry, { saving: true }),
  [_raspberry.saved]: raspberry => _extends({}, raspberry, { saving: false }),
  [_raspberry.sendingAction]: (raspberry, _ref4) => {
    let changes = _ref4.changes;
    let action = _ref4.action;
    return _extends({}, raspberry, changes, {
      actions: _extends({}, raspberry.actions, {
        [action]: 'sending'
      })
    });
  },
  [_raspberry.actionSent]: (raspberry, _ref5) => {
    let changes = _ref5.changes;
    let action = _ref5.action;
    return _extends({}, raspberry, changes, {
      actions: _extends({}, raspberry.actions, {
        [action]: null
      })
    }, (0, _raspberryActionManager.updateFromAction)(action));
  }
});

const raspberryHandler = (raspberries, action) => {
  if (!action.id) throw new Error(`Missing action.id, ${ action.type }`);
  return raspberries.map(raspberry => {
    if (raspberry.id !== action.id) return raspberry;
    return raspberryReducer(raspberry, action);
  });
};

exports.default = (0, _alpReactRedux.createReducer)(() => [], {
  [_raspberry.updateAll]: (state, _ref6) => {
    let raspberries = _ref6.raspberries;
    return _assert((() => {
      return raspberries;
    })(), _tcombForked2.default.list(_tcombForked2.default.Object), 'return value');
  },
  [_raspberry.add]: (raspberries, _ref7) => {
    let raspberry = _ref7.raspberry;
    return [...raspberries, raspberry];
  },
  [_raspberry.remove]: (raspberries, _ref8) => {
    let id = _ref8.id;
    return raspberries.filter(r => r.id !== id);
  },
  [_raspberry.update]: raspberryHandler,
  [_raspberry.updateConfig]: raspberryHandler,
  [_raspberry.screenshotUpdated]: raspberryHandler,
  [_raspberry.saving]: raspberryHandler,
  [_raspberry.saved]: raspberryHandler,
  [_raspberry.sendingAction]: raspberryHandler,
  [_raspberry.actionSent]: raspberryHandler
});

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
//# sourceMappingURL=raspberries.js.map