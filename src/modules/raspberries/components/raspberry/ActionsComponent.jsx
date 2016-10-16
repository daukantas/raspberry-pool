import React, { PureComponent, PropTypes } from 'react';
import actions from '../../raspberryActions';
import Spinner from '../../../common/components/SpinnerComponent';

export default class ActionsComponent extends PureComponent {
  static propTypes = {
    flat: PropTypes.bool,
    raspberries: PropTypes.array.isRequired,
    sendAction: PropTypes.func.isRequired,
  };

  render() {
    const { raspberries, sendAction, flat } = this.props;

    if (!raspberries || !raspberries.length) {
      return <div className="actions" />;
    }

    const availableActions = actions
      .map(action => ({
        ...action,
        raspberries: raspberries.filter(r => r.online && action.isVisible(r)),
      }))
      .filter(action => action.raspberries.length > 0);

    if (!availableActions.length) {
      return <div className="actions" />;
    }

    return (<div className={`actions dropdown button${!flat ? '' : ' flat'}`}>
      Actions
      <ul className="list">
        {availableActions.map(action => (
          <li
            key={action.value}
            onClick={() => {
              const raspberries = action.raspberries.filter(raspberry => !action.isInProgress(raspberry));
              if (raspberries.length) {
                return sendAction(raspberries, action.value);
              }
            }}
          >
            {action.name}
            <Spinner
              active={!!raspberries.filter(raspberry => (
                raspberry.actions && raspberry.actions[action.value] === 'sending' || action.isInProgress(raspberry)
              )).length}
            />
          </li>
        ))}
      </ul>
    </div>);
  }
}
