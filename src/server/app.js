import Alp from 'alp';
import reactredux from 'alp-react-redux';
import router from 'alp-limosa';
import routerBuilder from '../routerBuilder';
import Html from '../modules/common/layouts/Html';
import controllers from '../modules/controllers.server';
import { init as websocket } from '../websocket';
import config from '../config.server';

const app = new Alp({
  srcDiname: `${__dirname}/..`,
  packageDirname: `${__dirname}/../..`,
  config,
});

app.start(async () => {
  // config / init
  app.proxy = true;
  app.DATA_PATH = `${__dirname}/../../data/`;
  reactredux(Html)(app);

  // middlewares
  app.servePublic();
  app.catchErrors();
  app.use(router(routerBuilder, controllers)(app));

  await Promise.all([
    app.listen(),
    websocket(app),
  ]);
});

