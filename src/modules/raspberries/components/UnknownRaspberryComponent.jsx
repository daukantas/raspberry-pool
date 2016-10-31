import { PureComponent, PropTypes } from 'react';
import T from 'react-alp-translate/src';
import User from 'react-alp-user/src';
import Spinner from '../../common/components/SpinnerComponent';

export default class UnknownRaspberryComponent extends PureComponent {
  static propTypes = {
    raspberry: PropTypes.object.isRequired,
    offlineRaspberries: PropTypes.array.isRequired,
    registerUnknown: PropTypes.func.isRequired,
    // sendAction: PropTypes.func.isRequired,
  };

  state = {};

  render() {
    const { raspberry, registerUnknown, offlineRaspberries } = this.props;

    return (
      <div className="raspberry unknown">
        <Spinner active={raspberry.saving} />
        <div>
          <h2 className="text-title">{raspberry.hostname || raspberry.ip}</h2>
          <span className="status label">{raspberry.ip}</span>
          <span>&nbsp;</span>
          <span className="status label">{raspberry.online}</span>
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
              <label htmlFor={`add-raspberry-${raspberry.id}`}><T id="unknownRaspberry.add" /></label>
            </div>
            {!offlineRaspberries.length ? '' : [
              <div key="addToExisting" className="input radio">
                <input
                  id={`add-to-existing-raspberry-${raspberry.id}`}
                  name="addOrReplace"
                  type="radio"
                  value="addToExisting"
                  checked={this.state.addOrReplace === 'addToExisting'}
                  onChange={(e) => this.setState({ addOrReplace: e.target.value, id: null })}
                />
                <label htmlFor={`add-to-existing-raspberry-${raspberry.id}`}><T id="unknownRaspberry.addToExisting" /></label>
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
                <label htmlFor={`replace-raspberry-${raspberry.id}`}><T id="unknownRaspberry.replace" /></label>
              </div>,
            ]}
            <User>{user => (
              <select
                disabled={!this.state.addOrReplace}
                name="raspberry"
                onChange={(e) => this.setState({ addOrReplace: this.state.addOrReplace || 'replace', id: e.target.value })}
              >
                {!this.state.id && <option key="__empty" />}
                {offlineRaspberries.filter(r => r.data.owner === user.id).map(r => (
                  <option key={r.id} value={r.id}>{r.data.name}</option>
                ))}
              </select>
            )}</User>
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
}
