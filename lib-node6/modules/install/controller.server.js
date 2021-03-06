'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alp = require('alp');

var _fs = require('fs');

var _descriptor = require('./descriptor');

var moduleDescriptor = _interopRequireWildcard(_descriptor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const installScriptsDir = `${__dirname}/../../../install-scripts/`;
const date = new Date();
const CONFIG_PLACEHOLDER = '### SERVER CONFIG WILL BE INJECTED HERE ###';

const scripts = new Map((0, _fs.readdirSync)(installScriptsDir).filter(filename => filename.endsWith('.sh')).map(filename => [filename.slice(0, -3), (0, _fs.readFileSync)(`${installScriptsDir}${filename}`).toString()]));

exports.default = (0, _alp.newController)({
  index(ctx) {
    const websocketPort = ctx.app.config.get('webSocket').get('port');
    ctx.render(moduleDescriptor, { hostname: ctx.request.origin, websocketPort });
  },

  script(ctx) {
    ctx.assert(ctx.method === 'HEAD' || ctx.method === 'GET', 405);
    const scriptName = ctx.route.namedParams.get('scriptName');
    let scriptBody = scripts.get(scriptName);
    ctx.assert(scriptBody, 404);
    ctx.set('Last-Modified', date.toUTCString());

    if (scriptName === 'install-raspberry') {
      scriptBody = scriptBody.replace(CONFIG_PLACEHOLDER, `URL="${ctx.request.origin}/install-scripts/"`);
    } else if (scriptName === 'install-client') {
      scriptBody = scriptBody.replace(CONFIG_PLACEHOLDER, `SERVER_HOSTNAME="${ctx.request.origin}"\nSERVER_PORT=${ctx.app.config.get('webSocket').get('port')}`);
    }

    ctx.body = scriptBody;
  }
});
//# sourceMappingURL=controller.server.js.map