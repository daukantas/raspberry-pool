'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alp = require('alp');

var _descriptor = require('./descriptor');

var raspberriesDescriptor = _interopRequireWildcard(_descriptor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = (0, _alp.newController)({
  index(ctx) {
    return ctx.render(raspberriesDescriptor, { raspberries: [] });
  }
});
//# sourceMappingURL=controller.browser.js.map