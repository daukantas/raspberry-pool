import installController from './install/controller';
import noConfigController from './no-config/controller.server';
import raspberriesController from './raspberries/controller';

const controllers = new Map([
  ['install', installController],
  !BROWSER && ['no-config', noConfigController],
  ['raspberries', raspberriesController],
].filter(Boolean));

export default controllers;
