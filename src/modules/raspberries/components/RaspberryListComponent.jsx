import { connect } from 'alp-react-redux/src';
import Raspberry from './Raspberry';
import type { RaspberryType } from '../types';
import { registeredSelector } from '../selectors/index';

type PropsType = {
  raspberries: Array<RaspberryType>,
};

export default connect(
  state => ({ raspberries: registeredSelector(state) }),
)(({ raspberries }: PropsType) => (
  <ul className="raspberry-list">
    {raspberries.map(raspberry => (
      <li key={raspberry.id} className="raspberry-item">
        <Raspberry raspberry={raspberry} />
      </li>
    ))}
  </ul>
));
