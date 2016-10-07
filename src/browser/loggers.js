import { configure, levels, addGlobalProcessor } from 'nightingale';
import ConsoleHandler from 'nightingale-browser-console';
import errorProcessor from 'nightingale-error-processor';

addGlobalProcessor(errorProcessor);

configure([
  {
    // no patterns: default
    handlers: [new ConsoleHandler(levels.INFO)],
  },
  {
    patterns: ['app', 'app.*'],
    handlers: [new ConsoleHandler(levels.DEBUG)],
  },
]);
