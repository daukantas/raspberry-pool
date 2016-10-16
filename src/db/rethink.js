import { RethinkStore, RethinkConnection } from 'liwi/rethinkdb';
import { config } from 'alp-node/src';

export function rethinkConnection(): RethinkConnection {
  if (rethinkConnection._) return rethinkConnection._;

  return rethinkConnection._ = new RethinkConnection(config.get('db').get('rethinkdb'));
}

export default class Store extends RethinkStore {
  constructor(tableName: string) {
    super(rethinkConnection(), tableName);
  }
}
