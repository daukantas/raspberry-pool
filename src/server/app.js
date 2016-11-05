import Alp from 'alp-node/src';
import authInit from 'alp-auth/src';
import googleStrategy from 'alp-auth/strategies/google';
import reactredux from 'alp-react-redux/src';
import router from 'alp-limosa/src';
import routerBuilder from '../routerBuilder';
import Html from '../modules/common/layouts/Layout';
import controllers from '../modules/controllers';
import { init as websocket } from '../websocket/index.server';
import usersManager from '../models/user/usersManager';
import * as loginModuleDescriptor from '../modules/login/descriptor';

const app = new Alp();

app.start(async () => {
  // config / init
  app.proxy = true;
  app.DATA_PATH = `${__dirname}/../../data/`;
  reactredux(Html)(app);
  const promiseWebsocket = websocket(app);

  const authMiddleware = authInit({
    controllers,
    usersManager,
    strategies: { google: googleStrategy(app.config) },
    loginModuleDescriptor,
  })(app);

  // middlewares
  app.servePublic();
  app.catchErrors();
  app.use(authMiddleware);
  app.use(router(routerBuilder, controllers)(app));

  await Promise.all([
    app.listen(),
    promiseWebsocket,
  ]);
});

