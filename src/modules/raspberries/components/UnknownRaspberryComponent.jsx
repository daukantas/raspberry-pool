import { Component } from 'react';
import { connect } from 'alp-react-redux/src';
import T from 'react-alp-translate/src';
import type { UserBrowserType } from 'alp-auth/src/types';
import type { ReactNodeType } from 'alp-react-redux/src/types';
import Spinner from '../../common/components/SpinnerComponent';
import { registerUnknown } from '../actions/raspberry';
import type { RaspberryType } from '../types';
import type { RegisterUnknownFunctionType } from '../actions/raspberry';
import { ownerOfflineSelector } from '../selectors/index';

type PropsType = {
  user: UserBrowserType,
  raspberry: RaspberryType,
  offlineRaspberries: Array<RaspberryType>,
  registerUnknown: RegisterUnknownFunctionType,
};

export default connect(
  (state) => ({
    ownerOfflineRaspberries: ownerOfflineSelector(state),
  }),
  { registerUnknown },
)(class UnknownRaspberryComponent extends Component {
  state = {};

  // eslint-disable-next-line no-useless-constructor
  constructor(props: PropsType) {
    super(props);
  }

  render(): ReactNodeType {
    const { raspberry, ownerOfflineRaspberries, registerUnknown } = this.props;

    return (
      <div className="raspberry unknown">
        <Spinner active={raspberry.saving} />
        <div>
          <h2 className="text-title">{raspberry.hostname || raspberry.ip}</h2>
          <span className="status label">{raspberry.externalIp}</span>
          <span>&nbsp;</span>
          <span className="status label">{raspberry.ip}</span>
        </div>

        <div className="row row-responsive spaced">
          <div className="col wp-50">
            <div className="text-paragraph-title"><T id="unknownRaspberry.title" /></div>
            <div className="input text">
              <input
                type="text"
                required
                autoComplete="off"
                className={`${this.state.name === undefined ? '' : `has-value${this.state.name ? '' : ' has-empty-value'}`}`}
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              <label htmlFor={`raspberry-url-${raspberry.id}`}>Name</label>
            </div>
          </div>
          <div className="col wp-50">
            <div className="input radio">
              <input
                id={`add-raspberry-${raspberry.id}`}
                name="addOrReplace"
                type="radio"
                value=""
                checked={!this.state.addOrReplace}
                onChange={(e) => this.setState({ addOrReplace: e.target.value, id: null })}
              />
              <label htmlFor={`add-raspberry-${raspberry.id}`}>
                <T id="unknownRaspberry.add" />
              </label>
            </div>
            {!ownerOfflineRaspberries.length ? '' : [
              <div key="addToExisting" className="input radio">
                <input
                  id={`add-to-existing-raspberry-${raspberry.id}`}
                  name="addOrReplace"
                  type="radio"
                  value="addToExisting"
                  checked={this.state.addOrReplace === 'addToExisting'}
                  onChange={(e) => this.setState({ addOrReplace: e.target.value, id: null })}
                />
                <label htmlFor={`add-to-existing-raspberry-${raspberry.id}`}>
                  <T id="unknownRaspberry.addToExisting" />
                </label>
              </div>,
              <div key="replace" className="input radio">
                <input
                  id={`replace-raspberry-${raspberry.id}`}
                  name="addOrReplace"
                  type="radio"
                  value="replace"
                  checked={this.state.addOrReplace === 'replace'}
                  onChange={(e) => this.setState({ addOrReplace: e.target.value })}
                />
                <label htmlFor={`replace-raspberry-${raspberry.id}`}>
                  <T id="unknownRaspberry.replace" />
                </label>
              </div>,
            ]}
            <select
              disabled={!this.state.addOrReplace}
              name="raspberry"
              onChange={(e) => this.setState({ addOrReplace: this.state.addOrReplace || 'replace', id: e.target.value })}
            >
              {!this.state.id && <option key="__empty" />}
              {ownerOfflineRaspberries.map(r => (
                <option key={r.id} value={r.id}>{r.data.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="button-container align-center">
          <button
            type="button"
            disabled={!!raspberry.saving || (
              (!this.state.addOrReplace && !this.state.name)
              || (this.state.addOrReplace && !this.state.id)
            )}
            onClick={() => {
              registerUnknown(raspberry, {
                name: this.state.name,
                addOrReplace: this.state.addOrReplace,
                id: this.state.id,
              });
            }}
          >
            <T id="unknownRaspberry.add" />
          </button>
        </div>
      </div>
    );
        /*
                <button type="button" onClick={() => {
                    sendAction(raspberry, 'blink');
                    this.setState({ urlChanged: false });
                }}>Blink</button>
        */
  }
});
