import Link from 'react-alp-link/src';
import T from 'react-alp-translate/src';
import HeaderUser from '../HeaderUserComponent';


export default () => (
  <header className="header row space-between">
    <div>
      <div className="logo" />
    </div>
    <div className="end">
      <Link to="home" className="button flat">
        <T id="header.raspberriesLink" />
      </Link>
    </div>
    <div className="end">
      <HeaderUser />
    </div>
  </header>
);
