import React, { PureComponent, PropTypes } from 'react';
import T from 'react-alp-translate';
import Link from 'react-alp-link';
import Actions from './raspberry/ActionsComponent';
import HeaderUser from '../../common/components/HeaderUserComponent';

export default class HeaderComponent extends PureComponent {
  static propTypes = {
    raspberries: PropTypes.array,
    sendAction: PropTypes.func.isRequired,
  };

  static contextTypes = {
    context: PropTypes.object.isRequired,
  };

  render() {
    const { raspberries, sendAction } = this.props;

    return (<header className="header row space-between">
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
    </header>);
  }
}
