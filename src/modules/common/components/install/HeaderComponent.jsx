import { PropTypes } from 'react';
import Link from 'react-alp-link';
import T from 'react-alp-translate';
import HeaderUser from '../HeaderUserComponent';

HeaderComponent.contextTypes = {
  context: PropTypes.object.isRequired,
};

export default function HeaderComponent(props, { context }) {
  return (<header className="header row space-between">
    <div>
      <div className="logo" />
    </div>
    <div className="end">
      <Link to="home" className="button flat">Your raspberries</Link>
    </div>
    <div className="end">
      <HeaderUser />
    </div>
  </header>);
}
