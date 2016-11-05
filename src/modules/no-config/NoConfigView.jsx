import type { ReactNodeType } from 'alp-react-redux/src/types';
import SimpleLayout from '../common/layouts/SimpleLayout';

type PropsType = {
  url: string,
  ip: string,
};

// eslint-disable-next-line no-use-before-define
NoConfigView.Layout = SimpleLayout;
export default function NoConfigView({ url, ip }: PropsType): ReactNodeType {
  return (
    <div className="no-config">
      <div className="install-picture" />

      <div className="container-fixed">
        <h1 className="page-title">Not configured</h1>

        <p>Go to <a href={url}>{url}</a> to configure this raspberry</p>
        {!ip ? '' : <p className="ip">IP: {ip}</p>}
      </div>
    </div>
  );
}
