import { configure, levels } from 'nightingale/src';
import ConsoleHandler from 'nightingale-console/src';
import errorProcessor from 'nightingale-error-processor/src';

configure([
  {
    processors: [errorProcessor],
  },
  {
    pattern: /^app/,
    handlers: [new ConsoleHandler(levels.DEBUG)],
    stop: true,
  },
  {
    handlers: [new ConsoleHandler(levels.INFO)],
  },
]);
