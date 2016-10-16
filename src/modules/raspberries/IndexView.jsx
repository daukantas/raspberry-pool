import { PropTypes } from 'react';
import { connect } from 'alp-react-redux/src';
import User from 'react-alp-user/src';
import T from 'react-alp-translate/src';
import SubscribeContainer from 'react-alp-subscribe-container/src';
import { LoginButtons } from 'react-alp-login';
import Header from './components/HeaderComponent';
import RaspberryList from './components/RaspberryListComponent';
import UnknownRaspberryList from './components/UnknownRaspberryListComponent';
import * as raspberriesActions from './actions/raspberry';


const IndexView = (
  {
    unknownRaspberries,
    registeredRaspberries,
    sendAction,
    changeConfig,
    registerUnknown,
  },
  context,
) => {
  const title = context.context.t('raspberry-pool.title');
  context.setTitle(title);
  return (
    <div>
      <Header
        raspberries={registeredRaspberries}
        sendAction={sendAction}
      />
      <User>{user => (
        !user ? (
          <div key="home-not-connected" className="home-not-connected">
            <div className="picture" />
            <main className="main-container">
              <h1 className="page-title"><T id="home.notConnected.title" /></h1>
              <LoginButtons />
            </main>
          </div>
        ) : (
          <SubscribeContainer name="raspberries">
            <div>
              <UnknownRaspberryList
                key="unknown"
                raspberries={unknownRaspberries}
                offlineRaspberries={registeredRaspberries.filter(r => !r.online)}
                registerUnknown={registerUnknown}
                sendAction={sendAction}
              />
              <RaspberryList
                key="known"
                raspberries={registeredRaspberries}
                changeConfig={changeConfig}
                sendAction={sendAction}
              />
            </div>
          </SubscribeContainer>
        )
      )}</User>
    </div>
  );
};

IndexView.propTypes = {
  registeredRaspberries: PropTypes.array.isRequired,
  unknownRaspberries: PropTypes.array.isRequired,

  // actions
  sendAction: PropTypes.func.isRequired,
  changeConfig: PropTypes.func.isRequired,
  registerUnknown: PropTypes.func.isRequired,
};

IndexView.contextTypes = {
  setTitle: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
};

export default connect(
  ({ raspberries }) => ({
    registeredRaspberries: raspberries.filter(r => r.registered),
    unknownRaspberries: raspberries.filter(r => !r.registered),
  }),
  raspberriesActions,
)(IndexView);
