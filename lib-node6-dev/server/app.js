'use strict';

var _alp = require('alp');

var _alp2 = _interopRequireDefault(_alp);

var _alpReactRedux = require('alp-react-redux');

var _alpReactRedux2 = _interopRequireDefault(_alpReactRedux);

var _alpLimosa = require('alp-limosa');

var _alpLimosa2 = _interopRequireDefault(_alpLimosa);

var _routerBuilder = require('../routerBuilder');

var _routerBuilder2 = _interopRequireDefault(_routerBuilder);

var _Html = require('../modules/common/layouts/Html');

var _Html2 = _interopRequireDefault(_Html);

var _controllers = require('../modules/controllers.server');

var _controllers2 = _interopRequireDefault(_controllers);

var _websocket = require('../websocket');

var _config = require('../config.server');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const app = new _alp2.default({
  srcDiname: `${ __dirname }/..`,
  packageDirname: `${ __dirname }/../..`,
  config: _config2.default
});

app.start(_asyncToGenerator(function* () {
  // config / init
  app.proxy = true;
  app.DATA_PATH = `${ __dirname }/../../data/`;
  (0, _alpReactRedux2.default)(_Html2.default)(app);

  // middlewares
  app.servePublic();
  app.catchErrors();
  app.use((0, _alpLimosa2.default)(_routerBuilder2.default, _controllers2.default)(app));

  yield Promise.all([app.listen(), (0, _websocket.init)(app)]);
}));
//# sourceMappingURL=app.js.map