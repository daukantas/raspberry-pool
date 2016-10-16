'use strict';

var _alpNode = require('alp-node');

var _alpNode2 = _interopRequireDefault(_alpNode);

var _alpAuth = require('alp-auth');

var _alpAuth2 = _interopRequireDefault(_alpAuth);

var _google = require('alp-auth/strategies/google');

var _google2 = _interopRequireDefault(_google);

var _alpReactRedux = require('alp-react-redux');

var _alpReactRedux2 = _interopRequireDefault(_alpReactRedux);

var _alpLimosa = require('alp-limosa');

var _alpLimosa2 = _interopRequireDefault(_alpLimosa);

var _routerBuilder = require('../routerBuilder');

var _routerBuilder2 = _interopRequireDefault(_routerBuilder);

var _Html = require('../modules/common/layouts/Html');

var _Html2 = _interopRequireDefault(_Html);

var _controllers = require('../modules/controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _websocket = require('../websocket');

var _usersManager = require('../models/user/usersManager');

var _usersManager2 = _interopRequireDefault(_usersManager);

var _descriptor = require('../modules/login/descriptor');

var loginModuleDescriptor = _interopRequireWildcard(_descriptor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const app = new _alpNode2.default();

app.start(_asyncToGenerator(function* () {
  // config / init
  app.proxy = true;
  app.DATA_PATH = `${ __dirname }/../../data/`;
  (0, _alpReactRedux2.default)(_Html2.default)(app);
  const promiseWebsocket = (0, _websocket.init)(app);

  const authMiddleware = (0, _alpAuth2.default)({
    controllers: _controllers2.default,
    usersManager: _usersManager2.default,
    strategies: { google: (0, _google2.default)(app.config) },
    loginModuleDescriptor
  })(app);

  // middlewares
  app.servePublic();
  app.catchErrors();
  app.use(authMiddleware);
  app.use((0, _alpLimosa2.default)(_routerBuilder2.default, _controllers2.default)(app));

  yield Promise.all([app.listen(), promiseWebsocket]);
}));
//# sourceMappingURL=app.js.map