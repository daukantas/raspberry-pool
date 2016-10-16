import Html from 'fody-html-layout/src';

export default (props) => {
  // eslint-disable-next-line react/prop-types
  const user = props.initialBrowserContext.state.user;

  return (
    <Html
      preBody={<div id="disconnected"><div>disconnected</div></div>}
      styleName={user && user.emailDomains.includes('evaneos.com') && 'evaneos'}
      {...props}
    />
  );
};
