import { connect } from 'alp-react-redux/src';
import UnknownRaspberry from './UnknownRaspberryComponent';
import type { RaspberryType } from '../types';
import { unknonwnSelector } from '../selectors/index';

type PropsType = {
  raspberries: Array<RaspberryType>,
};

export default connect((state) => ({
  raspberries: unknonwnSelector(state),
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
