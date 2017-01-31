'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ownerOfflineSelector = exports.unknonwnSelector = exports.offlineSelector = exports.registeredSelector = undefined;

var _reselect = require('reselect');

const getRaspberries = state => state.raspberries;
const getUser = state => state.user;

const registeredSelector = exports.registeredSelector = (0, _reselect.createSelector)([getRaspberries], raspberries => raspberries.filter(r => r.registered));

const offlineSelector = exports.offlineSelector = (0, _reselect.createSelector)([getRaspberries], raspberries => raspberries.filter(r => r.registered && !r.online));

const unknonwnSelector = exports.unknonwnSelector = (0, _reselect.createSelector)([getRaspberries], raspberries => raspberries.filter(r => !r.registered));

const ownerOfflineSelector = exports.ownerOfflineSelector = (0, _reselect.createSelector)([offlineSelector, getUser], (raspberries, user) => raspberries.filter(r => r.data.owner === user.id));
//# sourceMappingURL=index.js.map