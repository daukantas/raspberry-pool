import { PropTypes } from 'react';
import Link from 'react-alp-link';
import T from 'react-alp-translate';

HeaderUserComponent.contextTypes = {
  context: PropTypes.object,
};

export default function HeaderUserComponent(props, { context: { state: { user } } }) {
  if (user) {
    return (
      <div className="dropdown button flat">
        {user.displayName}
        <ul className="list links">
          <li><Link to="logout" target="_self"><T id="header.logout" /></Link></li>
        </ul>
      </div>
    );
  }

  return (
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
  );
}
