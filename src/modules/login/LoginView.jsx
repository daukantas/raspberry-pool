import React, { PropTypes } from 'react';
import { LoginButtons } from 'react-alp-login/src';
import Header from '../common/components/install/HeaderComponent';

LoginView.contextTypes = {
  setTitle: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};

export default function LoginView(props, { setTitle, context }) {
  const title = context.t('title');
  setTitle(`${title} - Login`);
  return (
    <div className="login-view">
      <Header />
      <LoginButtons />
    </div>
  );
}
