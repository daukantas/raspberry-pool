/* eslint-disable no-template-curly-in-string */
import { routes } from 'alp-auth/src';

export default function buildRouter(builder) {
  builder.add('home', '/', 'raspberries.index');
  builder.add('screenshot', '/screenshot', 'raspberries.screenshot', { extension: 'jpg' });
  builder.add('installScript', '/install-scripts/${scriptName}', 'install.script', { extension: 'sh' });
  builder.addSegment.apply(builder, routes.login);
  builder.add.apply(builder, routes.logout);
  builder.add('default', '/${controller}', 'site.index', { extension: 'html' });
}
