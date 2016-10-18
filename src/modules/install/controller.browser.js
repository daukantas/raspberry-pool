import { newController } from 'alp';
import InstallView from './InstallView';

export default newController({
  index(ctx) {
    const websocketPort = ctx.app.config.get('webSocket').get('port');
    ctx.render({ View: InstallView }, { hostname: ctx.request.origin, websocketPort });
  },
});
