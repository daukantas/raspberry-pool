import User from 'react-alp-user/src';
import Link from 'react-alp-link/src';
import T from 'react-alp-translate/src';

export default (() => (
  <User>{user => (
    user ? (
      <div className="dropdown button flat">
        {user.displayName}
        <ul className="list links">
          <li><Link to="logout" target="_self"><T id="header.logout" /></Link></li>
        </ul>
      </div>
    ) : (
      <div>
        <T id="header.login">{t =>
          <Link
            to="login"
            className="button flat"
            params={{ strategy: 'google' }}
            target="_self"
          >
            {t}
          </Link>
        }</T>
      </div>
    )
  )}</User>
));
