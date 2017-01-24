import { newController } from 'alp-browser/src';
import * as moduleDescriptor from './descriptor';

export default newController({
  index(ctx) {
    const websocketPort = ctx.app.config.get('webSocket').get('port');
    ctx.render(moduleDescriptor, { hostname: ctx.request.origin, websocketPort });
  },
});
