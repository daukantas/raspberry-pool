/* global window, document */
import Alp from 'alp';
import router from 'alp-limosa';
import reactredux from 'alp-react-redux';
import { init as websocket } from '../websocket/index.browser';
import controllers from '../modules/controllers';
import routerBuilder from '../routerBuilder';

import * as moduleDescriptors from '../modules';

const app = new Alp();
app.appVersion = window.VERSION;

app.start(async () => {
  console.log('start');
  // init
  await app.init();
  websocket(app);
  reactredux(document.getElementById('app'))(app);

  // middlewares
  app.catchErrors();
  app.use(router(routerBuilder, controllers)(app));

  if (window.MODULE_IDENTIFIER) {
    await app.initialRender(moduleDescriptors[window.MODULE_IDENTIFIER], window.initialData);
  }

  await app.run();
});
