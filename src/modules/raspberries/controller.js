import browserController from './controller.browser';
import serverController from './controller.server';

export default BROWSER ? browserController : serverController;
