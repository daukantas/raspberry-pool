import { connect } from 'alp-react-redux/src';
import Raspberry from './Raspberry';
import type { RaspberryType } from '../types';

type PropsType = {
  raspberries: Array<RaspberryType>,
};

export default connect(
  ({ raspberries }) => ({ raspberries: raspberries.filter(r => r.registered) }),
)(({ raspberries }: PropsType) => (
  <ul className="raspberry-list">
    {raspberries.map(raspberry => (
      <li key={raspberry.id} className="raspberry-item">
        <Raspberry raspberry={raspberry} />
      </li>
    ))}
  </ul>
));
