import { connect } from 'alp-react-redux/src';
import T from 'react-alp-translate/src';
import Link from 'react-alp-link/src';
import Actions from './raspberry/Actions';
import HeaderUser from '../../common/components/HeaderUserComponent';
import type { RaspberryType } from '../types';

type PropsType = {
  onlineRaspberries: Array<RaspberryType>,
};

export default connect(
  ({ raspberries }) => ({ onlineRaspberries: raspberries.filter(r => r.registered && r.online) }),
)(({ onlineRaspberries }: PropsType) => (
  <header className="header row space-between">
    <div>
      <div className="logo" />
    </div>
    <div className="end">
      <Link to="default" params={{ controller: 'install' }} className="button flat">
        <T id="header.installClientLink" />
      </Link>
      <Actions flat raspberries={onlineRaspberries} />
    </div>
    <div className="end">
      <HeaderUser />
    </div>
  </header>
));
