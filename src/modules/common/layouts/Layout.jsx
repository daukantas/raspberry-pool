import { AlpHtml, AlpHead, AlpBody } from 'alp-react-redux/src';
import type { LayoutPropsType, ReactElementType } from 'alp-react-redux/src/types';

export default ({ helmet, content, ...props }: LayoutPropsType): ReactElementType => {
  // eslint-disable-next-line react/prop-types
  const user = props.initialBrowserContext.state.user;

  return (
    <AlpHtml helmet={helmet}>
      <AlpHead
        helmet={helmet}
        styleName={user && user.emailDomains.includes('evaneos.com') ? 'evaneos' : 'index'}
        {...props}
      />
      <AlpBody>
        <div id="disconnected">
          <div>disconnected</div>
        </div>
        <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      </AlpBody>
    </AlpHtml>
  );
};
