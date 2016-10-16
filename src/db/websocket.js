import { WebsocketStore } from 'liwi/src/websocket-client';
import { websocket } from 'alp-websocket';

export default class Store extends WebsocketStore {
  constructor(restName) {
    super(websocket, restName);
  }
}
