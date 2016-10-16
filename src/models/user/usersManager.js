import { rethinkUsersManager } from 'alp-auth/src';
import Store from '../../db/rethink';

const usersManager = Object.create(rethinkUsersManager);
usersManager.store = new Store('users');
export default usersManager;
