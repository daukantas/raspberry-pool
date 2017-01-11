import { connect } from 'alp-react-redux/src';
import UnknownRaspberry from './UnknownRaspberryComponent';
import type { RaspberryType } from '../types';

type PropsType = {
  raspberries: Array<RaspberryType>,
};

export default connect(({ raspberries }) => ({
  raspberries: raspberries.filter(r => !r.registered),
}))(({ raspberries }: PropsType) => {
  if (!raspberries.length) {
    return null;
  }

  return (
    <ul className="raspberry-list">
      {raspberries.map(raspberry => <li key={raspberry.id} className="raspberry-item">
        <UnknownRaspberry raspberry={raspberry} />
      </li>)}
    </ul>
  );
});
