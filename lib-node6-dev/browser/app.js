'use strict';

var _alp = require('alp');

var _alp2 = _interopRequireDefault(_alp);

var _alpLimosa = require('alp-limosa');

var _alpLimosa2 = _interopRequireDefault(_alpLimosa);

var _alpReactRedux = require('alp-react-redux');

var _alpReactRedux2 = _interopRequireDefault(_alpReactRedux);

var _websocket = require('../websocket');

var _controllers = require('../modules/controllers.browser');

var _controllers2 = _interopRequireDefault(_controllers);

var _routerBuilder = require('../routerBuilder');

var _routerBuilder2 = _interopRequireDefault(_routerBuilder);

var _modules = require('../modules');

var moduleDescriptors = _interopRequireWildcard(_modules);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global window, document */


const app = new _alp2.default();
app.appVersion = window.VERSION;

app.start(_asyncToGenerator(function* () {
  // init
  yield app.init();
  (0, _websocket.init)(app);
  (0, _alpReactRedux2.default)(document.getElementById('app'))(app);

  // middlewares
  app.catchErrors();
  app.use((0, _alpLimosa2.default)(_routerBuilder2.default, _controllers2.default)(app));

  if (window.MODULE_IDENTIFIER) {
    yield app.initialRender(moduleDescriptors[window.MODULE_IDENTIFIER], window.initialData);
  }

  yield app.run();
}));
//# sourceMappingURL=app.js.map