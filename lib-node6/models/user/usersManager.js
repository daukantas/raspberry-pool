'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alpAuth = require('alp-auth');

var _rethink = require('../../db/rethink');

var _rethink2 = _interopRequireDefault(_rethink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersManager = Object.create(_alpAuth.rethinkUsersManager);
usersManager.store = new _rethink2.default('users');
exports.default = usersManager;
//# sourceMappingURL=usersManager.js.map