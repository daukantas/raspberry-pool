'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildRouter;

var _alpAuth = require('alp-auth');

function buildRouter(builder) {
  builder.add('home', '/', 'raspberries.index');
  builder.add('screenshot', '/screenshot', 'raspberries.screenshot', { extension: 'jpg' });
  builder.add('installScript', '/install-scripts/${scriptName}', 'install.script', { extension: 'sh' });
  builder.addSegment.apply(builder, _alpAuth.routes.login);
  builder.add.apply(builder, _alpAuth.routes.logout);
  builder.add('default', '/${controller}', 'site.index', { extension: 'html' });
} /* eslint-disable no-template-curly-in-string */
//# sourceMappingURL=routerBuilder.js.map