/* global window, document */
import Alp from 'alp-browser/src';
import router from 'alp-limosa/src';
import reactredux from 'alp-react-redux/src';
import { init as websocket } from '../websocket/index.browser';
import controllers from '../modules/controllers';
import routerBuilder from '../routerBuilder';

import * as moduleDescriptors from '../modules';

const app = new Alp();

app.start(async () => {
  // init
  await app.init();
  websocket(app);
  reactredux(document.getElementById('app'))(app);

  // middlewares
  app.catchErrors();
  app.use(router(routerBuilder, controllers)(app));

  if (window.MODULE_IDENTIFIER && window.MODULE_IDENTIFIER !== 'install') {
    await app.initialRender(moduleDescriptors[window.MODULE_IDENTIFIER], window.initialData);
  }

  await app.run();
});
