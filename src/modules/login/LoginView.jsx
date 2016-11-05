import { Helmet } from 'alp-react-redux/src';
import type { ReactNodeType } from 'alp-react-redux/src/types';
import { LoginButtons } from 'react-alp-login/src';
import Header from '../common/components/install/HeaderComponent';

export default function LoginView(): ReactNodeType {
  return (
    <div className="login-view">
      <Helmet title="Login" />
      <Header />
      <LoginButtons />
    </div>
  );
}
