/* eslint-disable jsx-a11y/no-static-element-interactions */
import { connect } from 'alp-react-redux/src';
import actions from '../../raspberryActions';
import Spinner from '../../../common/components/SpinnerComponent';
import { sendAction } from '../../actions/raspberry';
import s from './Actions.styl';
import type { SendActionFunctionType } from '../../actions/raspberry';
import type { RaspberryType } from '../../types';

type PropsType = {
  raspberries: Array<RaspberryType>,
  sendAction: SendActionFunctionType,
  flat: ?boolean,
};

export default connect(
  null,
  { sendAction },
)(({ raspberries, sendAction, flat }: PropsType) => {
  if (!raspberries || !raspberries.length) {
    return <div className={s.actions} />;
  }

  const availableActions = actions
    .map(action => ({
      ...action,
      raspberries: raspberries.filter(r => r.online && action.isVisible(r)),
    }))
    .filter(action => action.raspberries.length > 0);

  if (!availableActions.length) {
    return <div className={s.actions} />;
  }

  return (
    <div className={`${s.actions} dropdown button${!flat ? '' : ' flat'}`}>
      Actions
      <ul className="list">
        {availableActions.map(action => (
          <li
            key={action.value}
            onClick={() => {
              const raspberries = action.raspberries.filter(raspberry => (
                !action.isInProgress(raspberry)
              ));
              if (raspberries.length) {
                return sendAction(raspberries, action.value);
              }
            }}
          >
            {action.name}
            <Spinner
              active={!!raspberries.filter(raspberry => (
                (raspberry.actions && raspberry.actions[action.value] === 'sending')
                 || action.isInProgress(raspberry)
              )).length}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});
