import { Component } from 'react';
import { connect } from 'alp-react-redux/src';
import T from 'react-alp-translate/src';
import Spinner from '../../common/components/SpinnerComponent';
import Actions from './raspberry/Actions';
import { changeConfig } from '../actions/raspberry';
import s from './Raspberry.styl';
import type { RaspberryType } from '../types';
import type { ChangeConfigFunctionType } from '../actions/raspberry';

type PropsType = {
  raspberry: RaspberryType,
  changeConfig: ChangeConfigFunctionType,
};

export default connect(
  null, // { raspberries:  },
  { changeConfig }
)(class Raspberry extends Component {
  constructor(props: PropsType) {
    super(props);
    this.state = {};
  }

  render() {
    const { raspberry, changeConfig } = this.props;

    let url;
    let display;
    if (this.state.url != null) {
      url = this.state.url;
    } else if (raspberry.saving) {
      url = this.state.lastUrl;
    } else {
      url = raspberry.data.config.url;
    }

    if (this.state.display != null) {
      display = this.state.display;
    } else if (raspberry.saving) {
      display = this.state.lastDisplay;
    } else {
      display = raspberry.data.config.display;
    }

    if (!display) {
      display = url ? 'chromium' : 'none';
    }

    return (
      <div className="raspberry">
        <div className="img-container">
          <img alt="screenshot" src={`/screenshot.jpg?id=${raspberry.id}&date=${Date.now()}`} />
        </div>
        <div className="header-container">
          <h2 className="text-title">
            <span
              className={`screen-status ${raspberry.online ? raspberry.screenState : 'offline'}`}
              title={raspberry.screenState === 'on' ? 'On' : 'Off'}
            >
              <span className="icon" />
              <span className="status" />
            </span>
            {raspberry.data.name}
          </h2>

          <div>
            {raspberry.data.organisation}
          </div>
        </div>
        <Spinner active={raspberry.saving} />

        <div className="status-container">
          <span className={`raspberry-status label ${raspberry.online ? 'success' : 'warning'}`}>
            {!raspberry.online ? <T id="raspberry.offline" /> : (
              `${raspberry.externalIp} | ${raspberry.ip}`
            )}
          </span>
        </div>

        <div className={s.actions}>
          <Actions raspberries={[raspberry]} />
        </div>

        <fieldset>
          <legend><T id="raspberry.config" /></legend>
          <div className="row row-responsive spaced">
            <div className="col" style={{ width: '100px', flexBasis: '100px', flexGrow: 0 }}>
              <div className="input select">
                <select
                  value={display}
                  id={`raspberry-select-${raspberry.id}`}
                  className={'has-value'}
                  onChange={(e) => this.setState({
                    display: raspberry.data.config.display === e.target.value ? null : e.target.value,
                  })}
                >
                  <option value="none">Empty</option>
                  <option value="chromium">chromium</option>
                  <option value="livestreamer">livestreamer</option>
                  <option value="omxplayer">omxplayer</option>
                </select>
                <label htmlFor={`raspberry-select-${raspberry.id}`}><T id="raspberry.display" /></label>
              </div>
            </div>
            {(display && display !== 'none') && (
              <div className="col">
                <div className="input text">
                  <input
                    id={`raspberry-url-${raspberry.id}`}
                    type={display === 'omxplayer' ? 'text' : 'url'} required
                    className={`has-value${url ? '' : ' has-empty-value'}`}
                    value={url}
                    autoComplete="off"
                    onChange={(e) => this.setState({
                      url: raspberry.data.config.url === e.target.value ? null : e.target.value,
                    })}
                  />
                  <label htmlFor={`raspberry-url-${raspberry.id}`}>
                    <T id={display === 'omxplayer' ? 'raspberry.urlOrPath' : 'raspberry.url'} />
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="button-container align-center">
            <button
              type="button"
              disabled={raspberry.saving || (this.state.url == null && this.state.display == null)}
              onClick={() => {
                const display = this.state.display || raspberry.data.config.display;
                const url = this.state.url || raspberry.data.config.url;
                this.setState({ url: null, lastUrl: url, display: null, lastDisplay: display });
                changeConfig(raspberry, { display, url });
              }}
            >
              <T id="raspberry.save" />
            </button>
          </div>
        </fieldset>
      </div>
    );
  }
});
