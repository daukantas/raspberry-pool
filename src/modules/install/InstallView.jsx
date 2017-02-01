import { Helmet, connect } from 'alp-react-redux/src';
import Link from 'react-alp-link/src';
import Header from '../common/components/install/HeaderComponent';

type PropsType = {
  user: ?Object,
  hostname: string,
  websocketPort: number,
};

export default connect(
  ({ context: { state: { user } } }) => ({ user }),
)(({ user, hostname, websocketPort }: PropsType) => (
  <div>
    <Helmet
      title="How to install raspberry client"
      meta={[
        {
          name: 'description',
          content: 'Install a raspberry to make it work with raspberry-pool',
        },
      ]}
    />
    <Header />
    <div className="install-picture" />

    <div className="container-fixed">
      <h1 className="page-title">How to install raspberry-client on your raspberry ?</h1>

      <ol className="list block">
        <li>1. Install raspbian (wheezy or jessie)</li>
        <li>
          2. Install the client

          <div>All-in-one install:</div>
          <pre>
            {`curl ${hostname}/install-scripts/install-raspberry.sh | `}
            USER_ID={user ? `'${user.id}'` : <Link to="login">Please login !</Link>}
            {' sh'}
          </pre>

          <div>Or install node and the client manually:</div>
          <pre>
            curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -{'\n'}
            sudo apt-get install -y nodejs git{'\n'}
            sudo npm install -g raspberry-client{'\n'}
            sudo rpi-cli install --userId={user ? `'${user.id}'` : <Link to="login">Please login !</Link>} --host={`'${hostname}'`} --port={websocketPort}
          </pre>
        </li>
      </ol>
    </div>
  </div>
));
