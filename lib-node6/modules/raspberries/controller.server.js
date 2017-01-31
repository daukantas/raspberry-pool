'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alp = require('alp');

var _koaSendfile = require('koa-sendfile');

var _koaSendfile2 = _interopRequireDefault(_koaSendfile);

var _ = require('./');

var raspberriesDescriptor = _interopRequireWildcard(_);

var _raspberriesManager = require('./raspberriesManager.server');

var raspberriesManager = _interopRequireWildcard(_raspberriesManager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _alp.newController)({
  index(ctx) {
    const raspberries = !ctx.state.connected ? [] : raspberriesManager.getAll(ctx.state.user);
    return ctx.render(raspberriesDescriptor, { raspberries });
  },

  screenshot: (() => {
    var _ref = _asyncToGenerator(function* (ctx) {
      const stats = yield (0, _koaSendfile2.default)(ctx, raspberriesManager.screenshotPath(ctx.query.id));
      if (!stats) {
        yield (0, _koaSendfile2.default)(ctx, `${__dirname}/../../../public/logo-210.jpg`);
      }
    });

    return function screenshot(_x) {
      return _ref.apply(this, arguments);
    };
  })()
});
//# sourceMappingURL=controller.server.js.map