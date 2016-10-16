'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alp = require('alp');

var _InstallView = require('./InstallView');

var _InstallView2 = _interopRequireDefault(_InstallView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _alp.newController)({
  index(ctx) {
    ctx.render({ View: _InstallView2.default }, { url: ctx.request.origin });
  }
});
//# sourceMappingURL=controller.browser.js.map