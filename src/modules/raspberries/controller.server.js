import { newController } from 'alp';
import send from 'koa-sendfile';
import * as raspberriesDescriptor from './';
import * as raspberriesManager from './raspberriesManager.server';

export default newController({
  index(ctx) {
    const raspberries = !ctx.state.connected ? [] : raspberriesManager.getAll(ctx.state.user);
    return ctx.render(raspberriesDescriptor, { raspberries });
  },

  screenshot: async (ctx) => {
    const stats = await send(ctx, raspberriesManager.screenshotPath(ctx.query.id));
    if (!stats) {
      await send(ctx, `${__dirname}/../../../public/logo-210.jpg`);
    }
  },
});
