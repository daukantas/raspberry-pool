import { Helmet, connect } from 'alp-react-redux/src';
import T from 'react-alp-translate/src';
import SubscribeContainer from 'react-alp-subscribe-container/src';
import { LoginButtons } from 'react-alp-login/src';
import Header from './components/Header';
import RaspberryList from './components/RaspberryListComponent';
import UnknownRaspberryList from './components/UnknownRaspberryListComponent';

export default connect(
  ({ context: { state: { user } } }) => ({ user }),
)(({ user }) => (
  <div>
    <T id="raspberry-pool.title">{t => <Helmet title={t} />}</T>
    <Header />
    {!user ? (
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
          <UnknownRaspberryList />
          <RaspberryList />
        </div>
      </SubscribeContainer>
    )}
  </div>
));
