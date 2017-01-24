'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alpBrowser = require('alp-browser');

var _descriptor = require('./descriptor');

var moduleDescriptor = _interopRequireWildcard(_descriptor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (0, _alpBrowser.newController)({
  index(ctx) {
    const websocketPort = ctx.app.config.get('webSocket').get('port');
    ctx.render(moduleDescriptor, { hostname: ctx.request.origin, websocketPort });
  }
});
//# sourceMappingURL=controller.browser.js.map