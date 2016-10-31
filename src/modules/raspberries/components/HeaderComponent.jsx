import React, { PropTypes } from 'react';
import T from 'react-alp-translate';
import Link from 'react-alp-link';
import Actions from './raspberry/ActionsComponent';
import HeaderUser from '../../common/components/HeaderUserComponent';

const HeaderComponent = ({ raspberries, sendAction }) => (
  <header className="header row space-between">
    <div>
      <div className="logo" />
    </div>
    <div className="end">
      <Link to="default" params={{ controller: 'install' }} className="button flat">
        <T id="header.installClientLink" />
      </Link>
      <Actions flat raspberries={raspberries} sendAction={sendAction} />
    </div>
    <div className="end">
      <HeaderUser />
    </div>
  </header>
);

HeaderComponent.propTypes = {
  raspberries: PropTypes.array,
  sendAction: PropTypes.func.isRequired,
};

HeaderComponent.contextTypes = {
  context: PropTypes.object.isRequired,
};

export default HeaderComponent;
